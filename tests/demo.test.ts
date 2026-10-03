import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createInitialState, demoReducer, filterConsultations, getCurrentCounts, getFunnel, getGroups, getPending, parseAppointment, DEMO_NOW, type DemoState, type DemoAction } from '../src/demo/model.ts'

function act(state: DemoState, ...actions: DemoAction[]) { return actions.reduce(demoReducer, state) }
const selected = () => act(createInitialState(), { type: 'navigate', view: 'patients' }, { type: 'select', id: 'demo-001' })
const patient = (state: DemoState) => state.consultations.find((row) => row.id === 'demo-001')!

test('recorrido completo: búsqueda combinada, contacto, cita, asistencia y reinicio exacto', () => {
  const initial = createInitialState()
  let state = act(initial, { type: 'navigate', view: 'patients' },
    { type: 'filter', key: 'search', value: 'Ana' }, { type: 'filter', key: 'source', value: 'Instagram' },
    { type: 'filter', key: 'treatment', value: 'Implantes' }, { type: 'filter', key: 'stage', value: 'lead' })
  assert.deepEqual(filterConsultations(state.consultations, state.filters).map((row) => row.id), ['demo-001'])
  state = act(state, { type: 'select', id: 'demo-001' }, { type: 'openModal', modal: 'contact' }, { type: 'simulateContact' })
  assert.equal(patient(state).stage, 'contacted')
  assert.match(patient(state).history.at(-1)!.text, /No se envió ningún mensaje real/)
  assert.equal(getFunnel(state.consultations)[1].count, getFunnel(initial.consultations)[1].count + 1)
  state = act(state, { type: 'openModal', modal: 'result' }, { type: 'outcome', value: 'scheduled' }, { type: 'appointment', value: '2026-10-05T10:30' }, { type: 'saveResult' })
  assert.equal(patient(state).stage, 'scheduled')
  assert.equal(getFunnel(state.consultations)[2].count, getFunnel(initial.consultations)[2].count + 1)
  assert.equal(getPending(state.consultations).find((row) => row.id === 'demo-001')!.nextAction!.dueAt, '2026-10-05T13:30:00.000Z')
  assert.equal(getGroups(state.consultations, 'source').find((row) => row.label === 'Instagram')!.scheduled, 2)
  assert.equal(getGroups(state.consultations, 'treatment').find((row) => row.label === 'Implantes')!.scheduled, 4)
  assert.equal(filterConsultations(state.consultations, { ...state.filters, stage: 'scheduled' }).length, 1)
  for (const view of ['summary', 'patients', 'pending', 'analysis'] as const) {
    state = demoReducer(state, { type: 'navigate', view })
    assert.equal(patient(state).stage, 'scheduled')
  }
  state = act(state, { type: 'select', id: 'demo-001' }, { type: 'openModal', modal: 'stage' }, { type: 'saveStage' })
  assert.equal(patient(state).stage, 'attended')
  assert.deepEqual(patient(state).reached, ['lead', 'contacted', 'scheduled', 'attended'])
  assert.equal(getFunnel(state.consultations)[3].count, getFunnel(initial.consultations)[3].count + 1)
  assert.equal(patient(state).nextAction!.label, 'Preparar presupuesto')
  assert.equal(getCurrentCounts(state.consultations).reduce((sum, row) => sum + row.count, 0), initial.consultations.length)
  assert.deepEqual(demoReducer(state, { type: 'reset' }), initial)
  assert.equal(patient(initial).stage, 'lead', 'el reducer no muta los datos originales')
})

test('no respondió registra un intento sin inventar respuesta ni cita', () => {
  const before = selected()
  const state = act(before, { type: 'openModal', modal: 'result' }, { type: 'saveResult' })
  assert.equal(patient(state).stage, 'lead')
  assert.deepEqual(getFunnel(state.consultations), getFunnel(before.consultations))
  assert.equal(patient(state).nextAction!.label, 'Reintentar contacto')
  assert.match(patient(state).history.at(-1)!.text, /sin respuesta/)
})

test('no está interesado cierra pendientes y conserva el embudo histórico', () => {
  const before = act(selected(), { type: 'openModal', modal: 'contact' }, { type: 'simulateContact' })
  const state = act(before, { type: 'openModal', modal: 'result' }, { type: 'outcome', value: 'lost' }, { type: 'saveResult' })
  assert.equal(patient(state).stage, 'lost')
  assert.equal(patient(state).nextAction, null)
  assert.ok(!getPending(state.consultations).some((row) => row.id === 'demo-001'))
  assert.deepEqual(getFunnel(state.consultations), getFunnel(before.consultations))
})

test('contacto y resultados nunca hacen retroceder una consulta avanzada', () => {
  const initial = createInitialState()
  const state = act(initial, { type: 'select', id: 'demo-005' }, { type: 'openModal', modal: 'contact' }, { type: 'simulateContact' },
    { type: 'openModal', modal: 'result' }, { type: 'outcome', value: 'contacted' }, { type: 'saveResult' })
  assert.equal(state.consultations[4].stage, 'quoted')
  assert.deepEqual(state.consultations[4].nextAction, initial.consultations[4].nextAction)
  assert.deepEqual(getFunnel(state.consultations), getFunnel(initial.consultations))
  const invalid = act(state, { type: 'openModal', modal: 'stage' }, { type: 'targetStage', value: 'lead' }, { type: 'saveStage' })
  assert.ok(invalid.error)
  assert.deepEqual(invalid.consultations, state.consultations)
})

test('agenda valida calendario, formato, hora y fecha futura del reloj de demo', () => {
  for (const value of ['', '2026-02-30T10:00', '2026-13-01T10:00', '2026-10-05T25:00', '2026-10-03T11:00', '2026-10-03T12:00']) {
    assert.equal(parseAppointment(value, DEMO_NOW), null, value)
  }
  const before = selected()
  const invalid = act(before, { type: 'openModal', modal: 'result' }, { type: 'outcome', value: 'scheduled' }, { type: 'saveResult' })
  assert.ok(invalid.error)
  assert.deepEqual(invalid.consultations, before.consultations)
  const valid = act(invalid, { type: 'appointment', value: '2026-10-06T09:00' }, { type: 'saveResult' })
  assert.deepEqual(patient(valid).reached, ['lead', 'contacted', 'scheduled'])
})

test('búsqueda por teléfono y acentos, filtros vacíos y limpiar', () => {
  let state = createInitialState()
  state = demoReducer(state, { type: 'filter', key: 'search', value: 'ines' })
  assert.equal(filterConsultations(state.consultations, state.filters)[0].name, 'Inés Demo')
  state = demoReducer(state, { type: 'filter', key: 'search', value: '0000000101' })
  assert.equal(filterConsultations(state.consultations, state.filters)[0].id, 'demo-001')
  state = demoReducer(state, { type: 'filter', key: 'source', value: 'Referido' })
  assert.equal(filterConsultations(state.consultations, state.filters).length, 0)
  state = demoReducer(state, { type: 'clearFilters' })
  assert.equal(filterConsultations(state.consultations, state.filters).length, 10)
})

test('cancelar cada modal no altera consultas ni métricas', () => {
  for (const modal of ['contact', 'result', 'stage'] as const) {
    const before = selected()
    const state = act(before, { type: 'openModal', modal }, { type: 'appointment', value: '2026-10-07T09:30' }, { type: 'closeModal' })
    assert.equal(state.modal, null)
    assert.equal(state.appointment, '')
    assert.deepEqual(state.consultations, before.consultations)
    assert.deepEqual(getFunnel(state.consultations), getFunnel(before.consultations))
  }
})

test('recorrido guiado usa las mismas acciones y finaliza en resumen actualizado', () => {
  let state = demoReducer(createInitialState(), { type: 'startTour' })
  assert.equal(state.view, 'pending')
  const id = state.tour!.id
  state = act(state, { type: 'select', id }, { type: 'openModal', modal: 'contact' }, { type: 'simulateContact' })
  assert.equal(state.tour!.step, 3)
  state = act(state, { type: 'openModal', modal: 'result' }, { type: 'outcome', value: 'scheduled' }, { type: 'appointment', value: '2026-10-05T11:00' }, { type: 'saveResult' })
  assert.equal(state.view, 'summary')
  assert.equal(state.tour!.step, 5)
  assert.equal(state.notice, 'Ahora la consulta tiene un próximo paso.')
  assert.equal(state.selectedId, null)
  assert.deepEqual(demoReducer(state, { type: 'restartTour' }), demoReducer(createInitialState(), { type: 'startTour' }))
  assert.deepEqual(demoReducer(state, { type: 'reset' }), createInitialState())
  const cancelled = demoReducer(state, { type: 'cancelTour' })
  assert.equal(cancelled.tour, null)
  assert.deepEqual(cancelled.consultations, state.consultations)
})

test('embudo conserva denominadores coherentes y los grupos suman el total', () => {
  const { consultations } = createInitialState()
  assert.deepEqual(getFunnel(consultations).map((row) => row.count), [10, 8, 6, 4, 3, 2, 1])
  for (const field of ['source', 'treatment'] as const) {
    const groups = getGroups(consultations, field)
    assert.equal(groups.reduce((sum, row) => sum + row.total, 0), consultations.length)
    assert.equal(groups.reduce((sum, row) => sum + row.scheduled, 0), 6)
  }
})
