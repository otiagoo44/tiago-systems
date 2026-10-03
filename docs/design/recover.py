from pathlib import Path

root = Path(__file__).resolve().parents[2]
p = root / 'src/styles.css'
s = p.read_text(encoding='utf-8')
tokens = {'#0B0F14':'#05070B','#111722':'#080B11','#18212E':'#0D1420','#202C3D':'#172335','#F5F7FA':'#F6F7F9','#CBD5E1':'#D9DEE7','#A8B3C5':'#9CA8B9','#2563EB':'#D2B36C','#1D4ED8':'#E2C67F','#93C5FD':'#D2B36C','rgba(37, 99, 235, 0.10)':'rgba(210, 179, 108, 0.08)','rgba(11,15,20,.96)':'rgba(5,7,11,.96)','#0b0f14d9':'#05070beF'}
for old,new in tokens.items(): s=s.replace(old,new)
s=s.replace('  --success:', '  --bg-alternate: #0A0F17;\n  --surface-raised: #101927;\n  --blue-info: #70A5FF;\n  --gold-primary: #D2B36C;\n  --gold-hover: #E2C67F;\n  --gold-subtle: rgba(210,179,108,.08);\n  --success:')
s=s.replace('--brand-primary: #D2B36C', '--brand-primary: var(--gold-primary)').replace('--brand-hover: #E2C67F','--brand-hover: var(--gold-hover)').replace('--brand-highlight: #D2B36C','--brand-highlight: var(--gold-primary)').replace('--brand-subtle: rgba(210, 179, 108, 0.08)','--brand-subtle: var(--gold-subtle)')
s=s.replace('color: #fff;', 'color: var(--bg-main);')
s=s.replace('.product { background: var(--surface); }','.product { background: var(--bg-main); }').replace('.founder { background: var(--surface); }','.founder { background: var(--bg-alternate); }').replace('.section-cream { background: var(--surface);','.section-cream { background: var(--bg-secondary);')
p.write_text(s,encoding='utf-8')

p=root/'src/demo/DentFlowDemo.tsx'
s=p.read_text(encoding='utf-8').replace('ArrowLeft, ArrowUpRight,','ArrowLeft, ArrowUpRight, AlertTriangle, ClipboardList,')
s=s.replace("event.key === 'ArrowRight'", "(event.key === 'ArrowRight' || event.key === 'ArrowDown')").replace("event.key === 'ArrowLeft'", "(event.key === 'ArrowLeft' || event.key === 'ArrowUp')")
start=s.index('export function HeroPreview')
end=s.index('function PatientList',start)
s=s[:start]+'''function FunnelStrip({ consultations }: { consultations: Consultation[] }) {
  return <section className="crm-funnel-strip" aria-label="Embudo comercial"><div className="crm-panel-heading"><h4>Embudo comercial</h4><p>Etapas alcanzadas · Cada tasa usa como base la etapa anterior.</p></div><div className="crm-funnel-cells">{getFunnel(consultations).map((row) => <div key={row.stage}><strong>{row.count}</strong><span>{row.label}</span><small>{row.stage === 'lead' ? 'Base del período' : `${row.percent}% avanzó`}</small></div>)}</div></section>
}

function ReviewPoint({ state, dispatch }: Props) {
  const drop = getFunnel(state.consultations).slice(1).reduce((largest, row) => row.denominator - row.count > largest.denominator - largest.count ? row : largest)
  return <div className="crm-review-point"><AlertTriangle size={24} aria-hidden="true" /><span className="eyebrow">PRINCIPAL PUNTO A REVISAR</span><h4>{drop.label}</h4><p>{drop.count} de {drop.denominator} avanzaron a esta etapa.</p><p className="crm-muted">{drop.percent}% avanzó · {drop.denominator - drop.count} no avanzaron.</p><small>Muestra ficticia y pequeña; no representa una tendencia de una clínica.</small><button className="crm-button" onClick={() => dispatch({ type: 'navigate', view: 'pending' })}>Ver pendientes <ArrowUpRight size={16} /></button></div>
}

export function HeroPreview({ state }: Pick<Props, 'state'>) {
  const funnel = getFunnel(state.consultations)
  const next = getPending(state.consultations)[0]
  return <div className="crm-preview"><div className="crm-preview-heading"><strong>DentFlow<span>Clínica de ejemplo</span></strong><span className="crm-badge">DATOS FICTICIOS</span></div><div className="crm-preview-layout"><div className="crm-preview-nav" aria-hidden="true">{views.map(({ id, label, icon: Icon }) => <span className={id === 'summary' ? 'is-active' : ''} key={id}><Icon size={14} />{label}</span>)}</div><div className="crm-preview-content"><span className="eyebrow">RESUMEN</span><h3>Cómo está funcionando<br />la clínica</h3><div className="crm-preview-metrics">{funnel.slice(0, 3).map((row) => <div key={row.stage}><strong>{row.count}</strong><span>{row.label}</span></div>)}</div><div className="crm-preview-next"><span>PRÓXIMA ACCIÓN</span><strong>{next?.nextAction?.label ?? 'Sin acciones pendientes'}</strong><small>{next ? `${next.name} · ${next.treatment}` : 'Seguimiento actualizado'}</small></div><a className="crm-preview-link" href="#demo-crm">Probá la demo interactiva <ArrowUpRight size={16} /></a></div></div></div>
}

function Summary({ state, dispatch }: Props) {
  return <><FunnelStrip consultations={state.consultations} /><div className="crm-summary-grid"><ReviewPoint state={state} dispatch={dispatch} /><div className="crm-current"><div className="crm-subheading"><h4>Etapa actual</h4><span>{state.consultations.length} consultas</span></div><p className="crm-muted">Cada consulta aparece una sola vez.</p><dl className="crm-counts">{getCurrentCounts(state.consultations).map((row) => <div key={row.stage}><dt>{row.label}</dt><dd>{row.count}</dd></div>)}</dl></div></div></>
}

''' + s[end:]
# Share existing filters with the work queue; no independent dataset.
s=s.replace("const rows = pending ? getPending(state.consultations) : filterConsultations(state.consultations, state.filters)", "const filtered = filterConsultations(state.consultations, state.filters)\n  const rows = pending ? getPending(filtered) : filtered\n  const queue = getPending(state.consultations)\n  const today = demoClock(state).slice(0, 10)\n  const urgency = [queue.filter(row => row.nextAction!.dueAt < demoClock(state)).length, queue.filter(row => row.nextAction!.dueAt >= demoClock(state) && row.nextAction!.dueAt.slice(0, 10) === today).length, queue.filter(row => row.nextAction!.dueAt.slice(0, 10) > today).length]")
s=s.replace('return <>{!pending && <div className="crm-filters">', 'return <>{pending && <div className="crm-queue-counts">{[\'Atender ahora\', \'Atender hoy\', \'Próximos\'].map((label, index) => <div key={label}><span>{label}</span><strong>{urgency[index]}</strong></div>)}</div>}<div className="crm-filters">')
s=s.replace('Limpiar filtros</button></div>}<div className="crm-subheading">','Limpiar filtros</button></div><div className="crm-subheading">')
s=s.replace('className="crm-patients"','className={`crm-patients${pending ? \' crm-patients--pending\' : \'\'}`}')
s=s.replace("pending ? 'No hay acciones pendientes.' : 'No encontramos consultas con esos filtros.'", "pending && !queue.length ? 'No hay acciones pendientes.' : 'No encontramos consultas con esos filtros.'")
s=s.replace('{!pending && <button className="crm-button" onClick={() => dispatch({ type: \'clearFilters\' })}>Limpiar filtros</button>}', '<button className="crm-button" onClick={() => dispatch({ type: \'clearFilters\' })}>Limpiar filtros</button>')
s=s.replace('<Funnel consultations={state.consultations} /> : <>','<div className="crm-analysis-layout"><Funnel consultations={state.consultations} /><ReviewPoint state={state} dispatch={dispatch} /></div> : <>')
start=s.index('  return <div className="gallery crm"')
s=s[:start]+'''  const headings = { summary: ['RESUMEN', 'Cómo está funcionando la clínica', 'Etapas alcanzadas y estado actual de las consultas.'], patients: ['CONSULTAS', 'Pacientes', 'El contexto de cada consulta, en un solo lugar.'], pending: ['COLA DE TRABAJO', 'Pendientes', 'Lo que necesita atención, ordenado por próxima acción.'], analysis: ['ANÁLISIS', 'Dónde se está frenando el proceso', 'Métricas calculadas desde las consultas de esta demo.'] }
  const [eyebrow, title, description] = headings[state.view]
  return <div className="gallery crm" id="demo-crm" data-animate>
    <div className="gallery-topline"><span className="gallery-index">EXPLORÁ DENTFLOW</span><span className="gallery-note">Demo interactiva · Datos ficticios</span></div>
    <div className="crm-toolbar"><div><strong>DentFlow<span className="crm-brand-dot">.</span></strong><span>Empezá por una consulta o seguí el recorrido.</span></div><div className="crm-actions"><button className="crm-button" onClick={() => dispatch({ type: 'startTour' })}>Ver recorrido guiado</button><button className="crm-button" onClick={() => { dispatch({ type: 'reset' }); tabs.current[0]?.focus() }}><RotateCcw size={15} /> Reiniciar demo</button></div></div>
    <div className="crm-workspace"><aside className="crm-sidebar"><div className="crm-clinic"><span>DENTAL CRM</span><strong>Clínica de ejemplo</strong></div><div className="crm-nav" role="tablist" aria-label="Vistas de DentFlow">{views.map(({ id, label, icon: Icon }, index) => <button ref={(el) => { tabs.current[index] = el }} key={id} id={`demo-tab-${id}`} role="tab" aria-selected={state.view === id} aria-controls="demo-panel" tabIndex={state.view === id ? 0 : -1} onClick={() => dispatch({ type: 'navigate', view: id })} onKeyDown={(e) => tabKey(e, index, views.length, (next) => { dispatch({ type: 'navigate', view: views[next].id as View }); tabs.current[next]?.focus() })}><Icon size={18} aria-hidden="true" /><span>{label}</span>{(id === 'patients' || id === 'pending') && <small>{id === 'patients' ? state.consultations.length : getPending(state.consultations).length}</small>}</button>)}</div><div className="crm-team"><span>EP</span><strong>Equipo de prueba<small>Entorno de demostración</small></strong></div></aside>
    <div className="crm-main">{state.tour && <aside className="crm-guide" aria-label="Recorrido guiado"><div><span>PASO {Math.min(state.tour.step + 1, 6)} / 6</span><p>{guide[state.tour.step]}</p></div><div className="crm-actions"><button className="crm-button" onClick={() => dispatch({ type: 'restartTour' })}>Reiniciar recorrido</button><button className="crm-icon-button" aria-label="Cancelar recorrido guiado" onClick={() => dispatch({ type: 'cancelTour' })}><X size={18} /></button></div></aside>}
    <div className="crm-status" role="status" aria-live="polite"><Check size={15} aria-hidden="true" /><span key={state.notice}>{state.notice}</span></div>
    <div id="demo-panel" role="tabpanel" aria-labelledby={`demo-tab-${state.view}`} tabIndex={0} className="crm-body"><div className="crm-view" key={row?.id ?? state.view}>{!row && <div className="crm-page-heading"><div><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{description}</p></div>{state.view === 'summary' && <button className="crm-button" onClick={() => dispatch({ type: 'navigate', view: 'analysis' })}><BarChart3 size={16} /> Abrir análisis</button>}</div>}{row ? <Detail state={state} dispatch={dispatch} consultation={row} /> : state.view === 'summary' ? <Summary state={state} dispatch={dispatch} /> : state.view === 'analysis' ? <Analysis state={state} dispatch={dispatch} /> : <PatientList state={state} dispatch={dispatch} pending={state.view === 'pending'} />}</div></div></div></div>
    <div className="crm-footnote"><span>Entorno de prueba · Sin conexión al CRM privado</span><span>Reloj simulado: {formatDate(demoClock(state))} de 2026 · PY</span></div><ActionDialog state={state} dispatch={dispatch} /></div>
}
'''
s=s.replace(', ClipboardList,', ',')
p.write_text(s,encoding='utf-8')
p=root/'src/demo/model.ts'
s=p.read_text(encoding='utf-8').replace("view: 'pending', selectedId: null", "view: 'pending', filters: { search: '', treatment: '', stage: '', source: '' }, selectedId: null")
p.write_text(s,encoding='utf-8')
for name in ['index.html','public/favicon.svg']:
 p=root/name
 s=p.read_text(encoding='utf-8')
 for old,new in tokens.items(): s=s.replace(old,new)
 p.write_text(s,encoding='utf-8')
