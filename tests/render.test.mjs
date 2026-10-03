import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

test('render React: enlaces públicos, texto exacto y vistas sin conexión al CRM', async () => {
  // Render en Node: no abre un navegador ni sustituye la revisión visual pendiente.
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: App } = await server.ssrLoadModule('/src/App.tsx')
    const { DentFlowDemo } = await server.ssrLoadModule('/src/demo/DentFlowDemo.tsx')
    const { createInitialState, demoReducer } = await server.ssrLoadModule('/src/demo/model.ts')
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
