import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const content = JSON.parse(readFileSync('src/resources/kit-content.json', 'utf8'))
mkdirSync('public/recursos', { recursive: true })
for (const file of content.files) {
  const source = `kit-separado-y-zip/${file.name}`
  const bytes = readFileSync(source)
  if (bytes.length !== file.bytes || createHash('sha256').update(bytes).digest('hex') !== file.sha256) {
    throw new Error(`El recurso cambió; auditá su contenido antes de publicar: ${source}`)
  }
  copyFileSync(source, `public/recursos/${file.name}`)
}

const server = await createServer({ server: { middlewareMode: true, hmr: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' })
try {
  const { default: ResourcesPage } = await server.ssrLoadModule('/src/resources/ResourcesPage.tsx')
  const prompt = readFileSync('kit-separado-y-zip/Dentflow_Mega_Prompt_Web_Odontologica.txt', 'utf8')
  const title = 'Kit gratuito de agenda y seguimiento | DentFlow · Tiago Systems'
  const description = 'Guías, prompt web, planilla editable y checklist para clínicas odontológicas. Consultá cada recurso desde el celular o descargá el kit gratuito, sin formulario.'
  let html = readFileSync('index.html', 'utf8')
    .replaceAll('Tiago Systems | Sistemas para Clínicas Odontológicas', title)
    .replaceAll('Conocé DentFlow, un sistema para organizar consultas, responsables, próximas acciones y seguimiento en clínicas odontológicas.', description)
    .replace('href="https://tiago-systems.vercel.app/"', 'href="https://tiago-systems.vercel.app/recursos/"')
    .replace('content="https://tiago-systems.vercel.app/"', 'content="https://tiago-systems.vercel.app/recursos/"')
    .replace('<div id="root"></div>', renderToStaticMarkup(createElement(ResourcesPage, { prompt })))
    .replace('<script type="module" src="/src/main.tsx"></script>', '<link rel="stylesheet" href="/src/styles.css" /><link rel="stylesheet" href="/src/resources/resources.css" /><script type="module" src="/src/resources/copy.ts"></script>')
    .replace(/<noscript>[\s\S]*?<\/noscript>/, '<noscript><style>#copy-prompt { display: none; }</style><p class="shell">Para copiar el prompt sin JavaScript, seleccioná su texto o descargá el TXT. Todos los recursos y enlaces siguen disponibles.</p></noscript>')
  mkdirSync('recursos', { recursive: true })
  writeFileSync('recursos/index.html', html)
  console.log('Recursos preparados: 5 archivos íntegros y página HTML sin dependencia de JavaScript.')
} finally {
  await server.close()
}
