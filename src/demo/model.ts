export const stages = ['lead', 'contacted', 'scheduled', 'attended', 'quoted', 'accepted', 'started'] as const
export type ActiveStage = typeof stages[number]
export type Stage = ActiveStage | 'lost'
export type View = 'summary' | 'patients' | 'pending' | 'analysis'
export type Outcome = 'no_response' | 'contacted' | 'scheduled' | 'lost'
export const stageLabels: Record<Stage, string> = {
  lead: 'Nueva consulta', contacted: 'Contactado', scheduled: 'Cita agendada', attended: 'Asistió',
  quoted: 'Presupuesto', accepted: 'Aceptado', started: 'Tratamiento iniciado', lost: 'No está interesado',
}
export const funnelLabels = ['Consultas', 'Contactadas', 'Citas agendadas', 'Asistieron', 'Presupuestos', 'Aceptaron', 'Iniciaron tratamiento']
export const DEMO_NOW = '2026-10-03T15:00:00.000Z'
export type Interaction = { id: string; at: string; text: string; kind: 'created' | 'stage' | 'contact' | 'result' }
export type Consultation = {
  id: string; name: string; phone: string; treatment: string; source: string; stage: Stage
  createdAt: string; owner: string; nextAction: { label: string; dueAt: string } | null
  reached: ActiveStage[]; history: Interaction[]
}
export type Filters = { search: string; treatment: string; stage: string; source: string }
export type DemoState = {
  consultations: Consultation[]; view: View; analysisTab: 'funnel' | 'sources' | 'treatments'
  filters: Filters; selectedId: string | null; modal: 'contact' | 'result' | 'stage' | null
  outcome: Outcome; appointment: string; targetStage: Stage; error: string; notice: string
  tour: { id: string; step: number } | null; revision: number
}

const addDays = (at: string, days: number) => new Date(Date.parse(at) + days * 86_400_000).toISOString()
export function nextActionFor(stage: Stage, at: string, appointment?: string): Consultation['nextAction'] {
  const labels: Partial<Record<Stage, string>> = {
    lead: 'Responder nueva consulta', contacted: 'Coordinar una cita', scheduled: 'Registrar asistencia',
    attended: 'Preparar presupuesto', quoted: 'Consultar decisión', accepted: 'Coordinar inicio de tratamiento',
  }
  return labels[stage] ? { label: labels[stage]!, dueAt: stage === 'scheduled' && appointment ? appointment : addDays(at, stage === 'quoted' || stage === 'accepted' ? 2 : 1) } : null
}

export function createInitialState(): DemoState {
  const rows: [string, string, string, Stage][] = [
    ['Ana Demo', 'Implantes', 'Instagram', 'lead'],
    ['Bruno Demo', 'Ortodoncia', 'Landing', 'contacted'],
    ['Carla Demo', 'Estética dental', 'Referido', 'scheduled'],
    ['Diego Demo', 'Implantes', 'Landing', 'attended'],
    ['Elena Demo', 'Ortodoncia', 'Instagram', 'quoted'],
    ['Fabio Demo', 'Estética dental', 'Referido', 'accepted'],
    ['Gloria Demo', 'Implantes', 'Landing', 'started'],
    ['Hugo Demo', 'Ortodoncia', 'Instagram', 'lost'],
    ['Inés Demo', 'Estética dental', 'Landing', 'lead'],
    ['Javier Demo', 'Implantes', 'Referido', 'scheduled'],
  ]
  const consultations = rows.map(([name, treatment, source, stage], index): Consultation => {
    const id = `demo-${String(index + 1).padStart(3, '0')}`
    const createdAt = addDays(DEMO_NOW, -14 + index)
    const reached = stages.slice(0, stage === 'lost' ? 2 : stages.indexOf(stage) + 1)
    const history: Interaction[] = reached.map((step, stepIndex) => ({
      id: `${id}-seed-${stepIndex}`, at: addDays(createdAt, stepIndex),
      kind: stepIndex === 0 ? 'created' : 'stage', text: stepIndex === 0 ? 'Consulta de ejemplo registrada' : `Etapa registrada: ${stageLabels[step]}`,
    }))
    if (stage === 'lost') history.push({ id: `${id}-seed-lost`, at: addDays(createdAt, 2), kind: 'result', text: 'No está interesado. Seguimiento cerrado.' })
    return { id, name, phone: `000 000 01${String(index + 1).padStart(2, '0')}`, treatment, source, stage, createdAt,
      owner: index % 2 ? 'Recepción B' : 'Recepción A', reached: [...reached], history,
      nextAction: nextActionFor(stage, addDays(DEMO_NOW, index % 3 - 2), stage === 'scheduled' ? addDays(DEMO_NOW, index === 2 ? -1 : 1) : undefined),
    }
  })
  return { consultations, view: 'summary', analysisTab: 'funnel', filters: { search: '', treatment: '', stage: '', source: '' }, selectedId: null,
    modal: null, outcome: 'no_response', appointment: '', targetStage: 'contacted', error: '', notice: 'Demo lista. Todos los datos son ficticios.', tour: null, revision: 0 }
}

export type DemoAction =
  | { type: 'navigate'; view: View }
  | { type: 'analysis'; tab: DemoState['analysisTab'] }
  | { type: 'filter'; key: keyof Filters; value: string }
  | { type: 'clearFilters' }
  | { type: 'select'; id: string }
  | { type: 'closeDetail' }
  | { type: 'openModal'; modal: NonNullable<DemoState['modal']> }
  | { type: 'closeModal' }
  | { type: 'outcome'; value: Outcome }
  | { type: 'appointment'; value: string }
  | { type: 'targetStage'; value: Stage }
  | { type: 'simulateContact' } | { type: 'saveResult' } | { type: 'saveStage' }
  | { type: 'reset' } | { type: 'startTour' } | { type: 'cancelTour' } | { type: 'restartTour' }

export function demoClock(state: DemoState) { return new Date(Date.parse(DEMO_NOW) + state.revision * 60_000).toISOString() }
export function parseAppointment(value: string, now: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value)
  if (!match) return null
  const [, year, month, day, hour, minute] = match.map(Number)
  const check = new Date(Date.UTC(year, month - 1, day, hour, minute))
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day || check.getUTCHours() !== hour || check.getUTCMinutes() !== minute) return null
  const timestamp = Date.parse(`${value}:00-03:00`)
  return Number.isFinite(timestamp) && timestamp > Date.parse(now) ? new Date(timestamp).toISOString() : null
}

export function nextStage(consultation: Consultation): Stage | null {
  if (consultation.stage === 'lost') return null
  return stages[stages.indexOf(consultation.stage) + 1] ?? null
}

function applyChange(state: DemoState, consultation: Consultation, stage: Stage, text: string, kind: Interaction['kind'], nextAction: Consultation['nextAction']): DemoState {
  const at = demoClock(state)
  const updated: Consultation = { ...consultation, stage, nextAction,
    reached: stage === 'lost' || consultation.reached.includes(stage) ? consultation.reached : [...consultation.reached, stage],
    history: [...consultation.history, { id: `${consultation.id}-event-${state.revision}`, at, text, kind }],
  }
  return { ...state, consultations: state.consultations.map((item) => item.id === updated.id ? updated : item), revision: state.revision + 1,
    modal: null, error: '', appointment: '', notice: `${consultation.name}: ${text}` }
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  if (action.type === 'reset') return createInitialState()
  if (action.type === 'restartTour') return demoReducer(createInitialState(), { type: 'startTour' })
  if (action.type === 'startTour') {
    const consultation = state.consultations.find((item) => item.stage === 'lead')
    return consultation ? { ...state, view: 'pending', selectedId: null, modal: null, tour: { id: consultation.id, step: 0 }, error: '', notice: 'Recorrido iniciado. Abrí la consulta señalada.' } : { ...state, notice: 'No quedan consultas nuevas. Reiniciá la demo para iniciar el recorrido.' }
  }
  if (action.type === 'cancelTour') return { ...state, tour: null, modal: null, error: '', notice: 'Recorrido cancelado. Tus cambios en la demo se conservan.' }
  if (action.type === 'navigate') return { ...state, view: action.view, selectedId: null, modal: null, error: '' }
  if (action.type === 'analysis') return { ...state, analysisTab: action.tab }
  if (action.type === 'filter') return { ...state, filters: { ...state.filters, [action.key]: action.value } }
  if (action.type === 'clearFilters') return { ...state, filters: { search: '', treatment: '', stage: '', source: '' } }
  if (action.type === 'select') return state.consultations.some((item) => item.id === action.id) ? { ...state, selectedId: action.id, modal: null, error: '', tour: state.tour?.id === action.id && state.tour.step === 0 ? { ...state.tour, step: 1 } : state.tour } : state
  if (action.type === 'closeDetail') return { ...state, selectedId: null, modal: null, error: '' }
  if (action.type === 'closeModal') return { ...state, modal: null, error: '', appointment: '' }
  if (action.type === 'outcome') return { ...state, outcome: action.value, error: '' }
  if (action.type === 'appointment') return { ...state, appointment: action.value, error: '' }
  if (action.type === 'targetStage') return { ...state, targetStage: action.value, error: '' }
  const consultation = state.consultations.find((item) => item.id === state.selectedId)
  if (!consultation) return state
  if (action.type === 'openModal') return { ...state, modal: action.modal, outcome: 'no_response', appointment: '', error: '', targetStage: nextStage(consultation) ?? consultation.stage,
    tour: state.tour?.id === consultation.id ? { ...state.tour, step: action.modal === 'contact' && state.tour.step === 1 ? 2 : action.modal === 'result' && state.tour.step === 3 ? 4 : state.tour.step } : state.tour }
  const now = demoClock(state)
  if (action.type === 'simulateContact') {
    if (state.modal !== 'contact') return state
    const stage = consultation.stage === 'lead' ? 'contacted' : consultation.stage
    const changed = applyChange(state, consultation, stage, 'Mensaje de WhatsApp simulado. No se envió ningún mensaje real.', 'contact', consultation.stage === 'lead' ? nextActionFor(stage, now) : consultation.nextAction)
    return { ...changed, tour: state.tour?.id === consultation.id && state.tour.step === 2 ? { ...state.tour, step: 3 } : state.tour }
  }
  if (action.type === 'saveResult') {
    if (state.modal !== 'result' || consultation.stage === 'lost') return state
    if (state.outcome === 'no_response') return applyChange(state, consultation, consultation.stage, 'No respondió. Intento registrado sin respuesta.', 'result', ['lead', 'contacted'].includes(consultation.stage) ? { label: 'Reintentar contacto', dueAt: addDays(now, 1) } : consultation.nextAction)
    if (state.outcome === 'lost') return applyChange(state, consultation, 'lost', 'No está interesado. Seguimiento cerrado.', 'result', null)
    if (state.outcome === 'contacted') return applyChange(state, consultation, consultation.stage === 'lead' ? 'contacted' : consultation.stage, 'Contacto confirmado por el equipo.', 'result', consultation.stage === 'lead' ? nextActionFor('contacted', now) : consultation.nextAction)
    if (stages.indexOf(consultation.stage) > stages.indexOf('scheduled')) return { ...state, error: 'Esta consulta ya superó la etapa de cita.' }
    const appointment = parseAppointment(state.appointment, now)
    if (!appointment) return { ...state, error: 'Elegí una fecha y hora válidas posteriores al reloj de la demo.' }
    // Agendar implica contacto confirmado; conservarlo de forma explícita en el embudo.
    const reached = consultation.reached.includes('contacted') ? consultation.reached : [...consultation.reached, 'contacted' as const]
    const changed = applyChange(state, { ...consultation, reached }, 'scheduled', `Cita agendada: ${formatDate(appointment)}. Contacto confirmado.`, 'result', nextActionFor('scheduled', now, appointment))
    return state.tour?.id === consultation.id && state.tour.step === 4 ? { ...changed, view: 'summary', selectedId: null, tour: { ...state.tour, step: 5 }, notice: 'Ahora la consulta tiene un próximo paso.' } : changed
  }
  if (action.type === 'saveStage') {
    if (state.modal !== 'stage') return state
    const target = state.targetStage
    if (consultation.stage === 'lost' || consultation.stage === 'started' || (target !== nextStage(consultation) && target !== 'lost')) return { ...state, error: 'Elegí la siguiente etapa disponible. No se puede retroceder el proceso.' }
    const appointment = target === 'scheduled' ? parseAppointment(state.appointment, now) : undefined
    if (target === 'scheduled' && !appointment) return { ...state, error: 'Elegí una fecha y hora válidas posteriores al reloj de la demo.' }
    return applyChange(state, consultation, target, target === 'attended' ? 'Asistencia registrada por el equipo.' : `Etapa actualizada: ${stageLabels[target]}.`, 'stage', nextActionFor(target, now, appointment ?? undefined))
  }
  return state
}

const normalized = (value: string) => value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
export function filterConsultations(consultations: Consultation[], filters: Filters) {
  const query = normalized(filters.search.trim())
  const digits = query.replace(/\D/g, '')
  return consultations.filter((item) => (!query || normalized(item.name).includes(query) || (digits.length > 0 && item.phone.replace(/\D/g, '').includes(digits)))
    && (!filters.treatment || item.treatment === filters.treatment) && (!filters.stage || item.stage === filters.stage) && (!filters.source || item.source === filters.source))
}
export function getPending(consultations: Consultation[]) {
  return consultations.filter((item) => item.nextAction && !['lost', 'started'].includes(item.stage)).sort((a, b) => Date.parse(a.nextAction!.dueAt) - Date.parse(b.nextAction!.dueAt))
}
export function getFunnel(consultations: Consultation[]) {
  return stages.map((stage, index) => {
    const count = consultations.filter((item) => item.reached.includes(stage)).length
    const denominator = index === 0 ? consultations.length : consultations.filter((item) => item.reached.includes(stages[index - 1])).length
    return { stage, label: funnelLabels[index], count, denominator, percent: denominator ? Math.round(count / denominator * 100) : 0 }
  })
}
export function getCurrentCounts(consultations: Consultation[]) {
  return [...stages, 'lost' as const].map((stage) => ({ stage, label: stageLabels[stage], count: consultations.filter((item) => item.stage === stage).length }))
}
export function getGroups(consultations: Consultation[], field: 'source' | 'treatment') {
  return [...new Set(consultations.map((item) => item[field]))].map((label) => {
    const group = consultations.filter((item) => item[field] === label)
    return { label, total: group.length, contacted: group.filter((item) => item.reached.includes('contacted')).length,
      scheduled: group.filter((item) => item.reached.includes('scheduled')).length, attended: group.filter((item) => item.reached.includes('attended')).length }
  }).sort((a, b) => b.total - a.total)
}
export function formatDate(value: string) {
  return new Intl.DateTimeFormat('es-PY', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'America/Asuncion' }).format(new Date(value))
}
