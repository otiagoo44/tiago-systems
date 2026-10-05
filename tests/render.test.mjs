import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync } from 'node:fs'

test('render React: enlaces públicos, texto exacto y vistas sin conexión al CRM', async () => {
  // Render en Node: complementa la revisión de navegador, no la sustituye.
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.tsx')
    const { DentFlowDemo } = await server.ssrLoadModule('/src/demo/DentFlowDemo.tsx')
    const { createInitialState, demoReducer } = await server.ssrLoadModule('/src/demo/model.ts')
    const { site, getContactHref, whatsappMessages } = await server.ssrLoadModule('/src/siteConfig.ts')
    const html = renderToStaticMarkup(createElement(App))
    const text = html.replace(/<[^>]+>/g, '')
    assert.ok(text.includes('Construyo sistemas para resolver problemas operativos reales.'))
    assert.ok(text.includes('DentFlow nació de esa idea: no agregar más herramientas porque sí, sino darle al equipo una forma clara de saber qué está pasando con cada consulta y cuál debería ser el próximo paso.'))
    assert.ok(text.includes('Me interesa construir software que se use, no software que solamente se vea bien en una demo.'))
    assert.ok(html.includes('https://www.instagram.com/tiago.systems/'))
    assert.ok(!html.includes('tiktok.com/@tiago.systems'))
    assert.ok(!html.includes('dental-crm-one.vercel.app'))
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1])
    assert.equal(new Set(ids).size, ids.length, 'IDs únicos')
    for (const [, fragment] of html.matchAll(/href="#([^"]*)"/g)) assert.ok(ids.includes(fragment), `Destino interno existente: ${fragment}`)
    assert.ok(text.includes('Que ninguna consulta quede sin próximo paso.'))
    assert.ok(site.founder.photo && site.founder.photoMobile, 'Retrato real responsive configurado')
    assert.ok(html.includes('Retrato de Tiago Ortega, fundador de Tiago Systems'))
    assert.ok(html.includes('480w, ') && html.includes('900w'), 'Dos tamaños de retrato')
    assert.ok(html.includes('class="founder-name">Tiago Ortega'), 'Nombre editorial fuera de la imagen')
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    assert.ok(!html.includes('id="recurso"'), 'No ofrecer un recurso aún inexistente')
    assert.equal(site.resource, null)
    const sections = ['enfoque', 'model-title', 'dentflow', 'equipo', 'proceso', 'prueba', 'para-tu-clinica', 'sobre-tiago', 'preguntas', 'contacto']
    for (let index = 1; index < sections.length; index++) assert.ok(html.indexOf(`id="${sections[index - 1]}"`) < html.indexOf(`id="${sections[index]}"`), 'Recorrido comercial en orden')
    const contactLinks = [...html.matchAll(/href="(https:\/\/wa\.me\/[^\"]+)"/g)].map((match) => match[1])
    assert.equal(contactLinks.length, 5)
    for (const [context, message] of Object.entries(whatsappMessages)) {
      const href = getContactHref(context)
      const url = new URL(href)
      assert.equal(url.pathname, '/595993367341')
      assert.equal(url.searchParams.get('text'), message, 'Mensaje completo, sin perder acentos')
      assert.ok(contactLinks.includes(href), `CTA para ${context}`)
    }
    const metadata = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
    assert.ok(metadata.includes('<html lang="es-PY">'))
    assert.ok(metadata.includes('<title>Tiago Systems | Sistemas para Clínicas Odontológicas</title>'))
    assert.ok(metadata.includes('href="https://tiago-systems.vercel.app/"'))

    const render = (state) => renderToStaticMarkup(createElement(DentFlowDemo, { state, dispatch() {} }))
    for (const view of ['summary', 'patients', 'pending', 'analysis']) {
      let state = demoReducer(createInitialState(), { type: 'navigate', view })
      const result = render(state)
      assert.ok(result.includes('Demo interactiva · Datos ficticios'))
      assert.ok(!result.includes('href="https:'), 'La demo no abre canales reales')
      assert.ok(result.includes(`aria-labelledby="demo-tab-${view}"`))
      if (view === 'analysis') for (const tab of ['funnel', 'sources', 'treatments']) {
        state = demoReducer(state, { type: 'analysis', tab })
        assert.ok(render(state).includes(`aria-labelledby="analysis-${tab}"`))
      }
    }
    let state = demoReducer(createInitialState(), { type: 'select', id: 'demo-001' })
    for (const modal of ['contact', 'result', 'stage']) {
      state = demoReducer(state, { type: 'openModal', modal })
      assert.ok(render(state).includes('Demo: no se enviará ningún mensaje real'))
    }
    state = demoReducer(createInitialState(), { type: 'navigate', view: 'patients' })
    state = demoReducer(state, { type: 'filter', key: 'search', value: 'sin coincidencias' })
    assert.ok(render(state).includes('No encontramos consultas con esos filtros.'))
  } finally { await server.close() }
})
