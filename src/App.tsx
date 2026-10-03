import { useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  Menu,
  MessageCircle,
  MoveUpRight,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'
import resumen from './assets/resumen-demo.svg'
import pendientes from './assets/pendientes-demo.svg'
import analisis from './assets/analisis-demo.svg'

const productViews = [
  {
    id: 'resumen',
    label: '01 / Resumen',
    eyebrow: 'VISIÓN GENERAL',
    title: 'Una vista clara de lo que está pasando.',
    text: 'Consultas y etapas del proceso en un mismo lugar para entender dónde hace falta actuar.',
    image: resumen,
    alt: 'Ilustración del resumen de DentFlow con embudo comercial y estado de las consultas',
  },
  {
    id: 'pendientes',
    label: '02 / Pendientes',
    eyebrow: 'COLA DE TRABAJO',
    title: 'Lo siguiente, a la vista del equipo.',
    text: 'Las consultas que necesitan atención quedan ordenadas para que recepción pueda revisar el contexto y avanzar.',
    image: pendientes,
    alt: 'Ilustración de la cola de pendientes de DentFlow',
  },
  {
    id: 'analisis',
    label: '03 / Análisis',
    eyebrow: 'LECTURA DEL PROCESO',
    title: 'Datos para hacer mejores preguntas.',
    text: 'El embudo muestra cómo avanzan las consultas entre etapas, con métricas que ayudan a detectar fricciones.',
    image: analisis,
    alt: 'Ilustración del análisis de etapas y embudo de DentFlow',
  },
] as const

const process = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'La consulta se registra',
    text: 'Una landing con formulario incorpora la consulta al sistema con la información que el paciente dejó.',
  },
  {
    number: '02',
    icon: UserRound,
    title: 'Recepción toma el contexto',
    text: 'El CRM reúne estado, responsable, próxima acción y fechas para saber qué necesita atención.',
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'El equipo da seguimiento',
    text: 'Desde el CRM abre WhatsApp con un mensaje prellenado, lo envía y registra el avance.',
  },
]

const capabilities = [
  { icon: ClipboardList, label: 'Consultas organizadas', detail: 'Información centralizada para trabajar con contexto.' },
  { icon: CalendarDays, label: 'Próxima acción visible', detail: 'Estado, responsable y fechas para continuar el seguimiento.' },
  { icon: MessageCircle, label: 'Contacto más simple', detail: 'Acceso a WhatsApp con un mensaje preparado para revisar y enviar.' },
  { icon: BarChart3, label: 'Métricas del proceso', detail: 'Una lectura de las etapas para encontrar puntos de fricción.' },
]

const faqs = [
  {
    question: '¿DentFlow responde mensajes automáticamente?',
    answer: 'No. El equipo abre WhatsApp desde el CRM con un mensaje prellenado, lo revisa, lo envía y registra el resultado. El seguimiento requiere trabajo humano.',
  },
  {
    question: '¿De dónde salen las consultas?',
    answer: 'En el funcionamiento actual, las consultas se registran mediante una landing con formulario y quedan organizadas en el CRM.',
  },
  {
    question: '¿Se puede ver el producto?',
    answer: 'Sí. Podés recorrer ilustraciones de las vistas de resumen, pendientes y análisis en la sección del producto, o abrir DentFlow desde esta página.',
  },
]

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''}`} href="#inicio" aria-label="Tiago Systems, volver al inicio">
      <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
      <span className="brand-type">TIAGO<span>SYSTEMS</span></span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeView, setActiveView] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)
  const view = productViews[activeView]

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <div className="topline"><span>TECNOLOGÍA APLICADA A NEGOCIOS</span><span>HECHO PARA EL TRABAJO REAL <span className="topline-star">✳</span></span></div>
      <header className="site-header" id="inicio">
        <div className="shell nav-inner">
          <Brand />
          <nav className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'} aria-label="Navegación principal">
            <a href="#enfoque" onClick={closeMenu}>Enfoque</a>
            <a href="#dentflow" onClick={closeMenu}>DentFlow</a>
            <a href="#proceso" onClick={closeMenu}>Cómo funciona</a>
            <a href="#sobre-tiago" onClick={closeMenu}>Sobre Tiago</a>
            <a className="mobile-contact" href="#contacto" onClick={closeMenu}>Siguiente paso <ArrowUpRight size={16} /></a>
          </nav>
          <a className="nav-cta" href="#contacto">Siguiente paso <ArrowUpRight size={16} strokeWidth={1.8} /></a>
          <button className="menu-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="contenido">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow" aria-hidden="true" />
          <div className="shell hero-inner">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> SISTEMAS QUE PONEN ORDEN</div>
              <h1 id="hero-title">Menos ruido.<br /><span>Más claridad</span><br />para avanzar<span className="period">.</span></h1>
              <p className="hero-lead">Diseño y desarrollo tecnología para que los negocios puedan ver mejor su operación y actuar con contexto.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#dentflow">Conocé DentFlow <ArrowUpRight size={19} /></a>
                <a className="text-link" href="#enfoque">Explorar el enfoque <ArrowDownRight size={19} /></a>
              </div>
              <div className="hero-signature"><span className="signature-line" /><span>TIAGO ORTEGA<br /><small>Detrás de Tiago Systems</small></span></div>
            </div>
            <div className="hero-art" aria-label="Vista previa del producto DentFlow">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="hero-art-label hero-art-label--top"><span className="status-dot" /> ILUSTRACIÓN DEL FLUJO</div>
              <div className="hero-window">
                <div className="window-top"><span className="window-dots"><i /><i /><i /></span><span>dentflow / panel de trabajo</span><span className="window-code">01—03</span></div>
                <div className="window-body">
                  <div className="mock-sidebar"><span className="mock-logo">D<span>F</span></span><span className="mock-side-active" /><span /><span /><span /><span /></div>
                  <div className="mock-content"><div className="mock-kicker">FLUJO DE TRABAJO</div><div className="mock-title">Todo empieza con claridad.</div><div className="mock-subtitle">Lo que requiere atención, en un solo lugar.</div><div className="mock-metrics"><div><small>CONSULTA</small><strong>✓</strong><em>Registrada</em></div><div><small>CONTEXTO</small><strong>✓</strong><em>Disponible</em></div><div><small>PRÓXIMO PASO</small><strong>→</strong><em>Definido</em></div></div><div className="mock-list"><span className="mock-list-icon"><MessageCircle size={17} /></span><span><b>Seguimiento preparado</b><small>Contexto · responsable · próxima acción</small></span><ArrowUpRight size={17} /></div></div>
                </div>
              </div>
              <div className="hero-art-label hero-art-label--bottom">IDEA <span>→</span> SISTEMA <span>→</span> ACCIÓN</div>
            </div>
          </div>
          <div className="hero-bottom shell"><span>01 / UNA MARCA, UN ENFOQUE</span><span>DESLIZÁ PARA EXPLORAR <ArrowDownRight size={16} /></span></div>
        </section>

        <section className="manifesto section-light" id="enfoque">
          <div className="shell manifesto-grid">
            <div className="section-label" data-reveal><span className="label-square" /> 01 / EL ENFOQUE</div>
            <div data-reveal>
              <h2>La tecnología tiene sentido cuando <em>ayuda a trabajar mejor.</em></h2>
              <div className="manifesto-bottom"><p>Tiago Systems es el espacio donde convierto problemas concretos de negocio en herramientas claras, útiles y pensadas para quienes las usan todos los días.</p><span className="asterisk" aria-hidden="true">✳</span></div>
            </div>
          </div>
        </section>

        <section className="product section-dark" id="dentflow" aria-labelledby="product-title">
          <div className="shell">
            <div className="product-heading" data-reveal>
              <div><div className="section-label section-label--orange"><span className="label-square" /> 02 / PRODUCTO ACTUAL</div><h2 id="product-title">Conocé <span>DentFlow.</span></h2></div>
              <p>Un CRM para clínicas odontológicas que reúne consultas, seguimiento y métricas en un flujo de trabajo más claro.</p>
            </div>
            <div className="product-showcase" data-reveal>
              <div className="product-tabs" role="tablist" aria-label="Vistas de DentFlow">
                {productViews.map((item, index) => <button key={item.id} className={activeView === index ? 'product-tab product-tab--active' : 'product-tab'} type="button" role="tab" id={`tab-${item.id}`} aria-selected={activeView === index} aria-controls="product-panel" onClick={() => setActiveView(index)}>{item.label}<ArrowUpRight size={17} /></button>)}
              </div>
              <div className="product-panel" id="product-panel" role="tabpanel" aria-labelledby={`tab-${view.id}`}>
                <div className="product-panel-copy"><span className="mini-label"><span className="status-dot" /> {view.eyebrow}</span><h3>{view.title}</h3><p>{view.text}</p><span className="real-screen"><Check size={15} /> ILUSTRACIÓN DEL PRODUCTO</span></div>
                <div className={`screen-frame screen-frame--${view.id}`}><img src={view.image} alt={view.alt} loading="lazy" /></div>
              </div>
            </div>
            <div className="feature-grid">
              {capabilities.map(({ icon: Icon, label, detail }, index) => <div className="feature" key={label} data-reveal><span className="feature-number">0{index + 1}</span><Icon size={27} strokeWidth={1.5} /><h3>{label}</h3><p>{detail}</p></div>)}
            </div>
          </div>
        </section>

        <section className="process section-cream" id="proceso" aria-labelledby="process-title">
          <div className="shell">
            <div className="process-heading" data-reveal><div className="section-label"><span className="label-square" /> 03 / CÓMO FUNCIONA</div><h2 id="process-title">Del primer interés<br />al <em>próximo paso.</em></h2><p>Un recorrido simple para que ninguna consulta quede suelta y el equipo sepa qué hacer después.</p></div>
            <div className="steps">
              {process.map(({ number, icon: Icon, title, text }) => <article className="step" key={number} data-reveal><div className="step-top"><span>{number} / 03</span><Icon size={26} strokeWidth={1.5} /></div><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="step-arrow" size={21} strokeWidth={1.5} /></article>)}
            </div>
            <div className="transparency" data-reveal><div className="transparency-icon"><Sparkles size={28} strokeWidth={1.5} /></div><div><span className="mini-label">UNA DISTINCIÓN IMPORTANTE</span><h3>El sistema ordena. Las personas hacen el seguimiento.</h3></div><p>DentFlow ayuda a registrar y priorizar. Recepción revisa cada caso, envía el mensaje desde WhatsApp y actualiza el avance en el CRM.</p></div>
          </div>
        </section>

        <section className="founder section-dark" id="sobre-tiago" aria-labelledby="founder-title">
          <div className="shell founder-grid">
            <div className="founder-art" data-reveal><div className="founder-orbit founder-orbit--one" /><div className="founder-orbit founder-orbit--two" /><div className="founder-monogram">TO<span>✳</span></div><div className="founder-art-caption">PERSONA <span>→</span> MARCA <span>→</span> PRODUCTO</div></div>
            <div className="founder-copy" data-reveal><div className="section-label section-label--orange"><span className="label-square" /> 04 / DETRÁS DEL SISTEMA</div><h2 id="founder-title">Hay una persona detrás de cada decisión<span>.</span></h2><p className="founder-lead">Soy Tiago Ortega. Tiago Systems es mi marca de tecnología aplicada a negocios, y DentFlow es el producto que hoy estoy construyendo para clínicas odontológicas.</p><p>Me interesa crear herramientas que hagan visible el trabajo, ordenen la información y ayuden a tomar la siguiente decisión con más claridad.</p><div className="founder-name"><span className="founder-line" /> TIAGO ORTEGA <ArrowUpRight size={18} /></div></div>
          </div>
        </section>

        <section className="faq section-light" aria-labelledby="faq-title"><div className="shell faq-grid"><div data-reveal><div className="section-label"><span className="label-square" /> 05 / PREGUNTAS FRECUENTES</div><h2 id="faq-title">Claro desde<br />el principio<span>.</span></h2><p>Estas son algunas respuestas sobre el funcionamiento actual de DentFlow.</p></div><div className="faq-list" data-reveal>{faqs.map(({ question, answer }, index) => <div className={`faq-item ${openFaq === index ? 'faq-item--open' : ''}`} key={question}><button type="button" aria-expanded={openFaq === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span className="faq-index">0{index + 1}</span><span>{question}</span><ChevronDown size={20} /></button><div className="faq-answer" id={`faq-answer-${index}`} hidden={openFaq !== index}><p>{answer}</p></div></div>)}</div></div></section>

        <section className="contact" id="contacto" aria-labelledby="contact-title"><div className="shell contact-inner" data-reveal><div className="section-label"><span className="label-square" /> 06 / SIGUIENTE PASO</div><h2 id="contact-title">De una idea clara<br />a un <em>sistema real.</em></h2><p>DentFlow es el producto actual de Tiago Systems. Mirá sus pantallas en esta página y accedé al sistema desde aquí.</p><a className="button button-dark" href="https://dental-crm-one.vercel.app/" target="_blank" rel="noreferrer">Abrir DentFlow <ExternalLink size={19} /></a><div className="contact-footnote">DE LA IDEA AL SISTEMA <span>✳</span> TIAGO SYSTEMS</div></div></section>
      </main>

      <footer className="footer"><div className="shell footer-main"><Brand inverse /><div className="footer-right"><a href="#inicio">Volver arriba <MoveUpRight size={17} /></a><span>TIAGO ORTEGA · TIAGO SYSTEMS · DENTFLOW</span></div></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} TIAGO SYSTEMS</span><span>TECNOLOGÍA PARA EL TRABAJO REAL.</span></div></footer>
    </>
  )
}

export default App
