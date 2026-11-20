import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

test('kit público: integridad binaria, documentos completos y acceso sin registro', async () => {
  const content = JSON.parse(readFileSync('src/resources/kit-content.json', 'utf8'))
  for (const file of content.files) {
    const original = readFileSync(`kit-separado-y-zip/${file.name}`)
    const publicCopy = readFileSync(`public/recursos/${file.name}`)
    assert.equal(original.length, file.bytes)
    assert.equal(createHash('sha256').update(original).digest('hex'), file.sha256)
    assert.deepEqual(publicCopy, original, `Copia íntegra: ${file.name}`)
  }
  assert.equal(content.pdfs['Dentflow_Kit_Guia_Practica.pdf'].pages, 11)
  assert.equal(content.pdfs['Dentflow_Checklist_Diagnostico.pdf'].pages, 2)
  const server = await createServer({ server: { middlewareMode: true, hmr: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' })
  try {
    const { default: ResourcesPage } = await server.ssrLoadModule('/src/resources/ResourcesPage.tsx')
    const prompt = readFileSync('kit-separado-y-zip/Dentflow_Mega_Prompt_Web_Odontologica.txt', 'utf8')
    const html = renderToStaticMarkup(createElement(ResourcesPage, { prompt }))
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
    assert.equal(new Set(ids).size, ids.length)
    for (const [, fragment] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(fragment), fragment)
    for (const { name } of content.files) assert.ok(html.includes(`href="/recursos/${name}" download=""`), name)
    assert.ok(!html.includes('<form'))
    assert.ok(!html.includes('<iframe'))
    assert.ok(!html.includes('<input'))
    assert.ok(html.includes('role="status"'))
    for (const sheet of ['INICIO', 'CONSULTAS', 'RESUMEN', 'LISTAS']) assert.ok(html.includes(sheet))
    const escape = text => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'}[char]))
    assert.ok(html.includes(escape(prompt)), 'TXT completo, sin resumir ni cambiar saltos/campos')
    for (const pdf of Object.values(content.pdfs)) for (const text of pdf.text) assert.ok(html.includes(escape(text)), 'Cada página completa')
    assert.equal((html.match(/<li>Registramos|<li>Podemos|<li>Cada consulta|<li>Sabemos|<li>La próxima|<li>Al cambiar|<li>Revisamos|<li>Contamos|<li>El propietario/g) || []).length, 9, 'Nueve preguntas originales en lectura móvil')
    assert.ok(html.includes('https://wa.me/595993367341?text='), 'Mismo canal comercial')
  } finally { await server.close() }
})
