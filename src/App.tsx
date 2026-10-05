import { useEffect, useReducer, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import { getContactHref, site, type ContactContext } from './siteConfig'
import { DentFlowDemo, HeroPreview } from './demo/DentFlowDemo'
import { createInitialState, demoReducer } from './demo/model'

function useEntranceMotion() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !('animate' in document.documentElement)) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        if (reducedMotion.matches) { observer.unobserve(element); continue }
        element.animate(
          [{ opacity: 0.3, transform: 'translateY(22px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 620, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'none' },
        )
        observer.unobserve(element)
      }
    }, { threshold: 0.12 })

    document.querySelectorAll('[data-animate]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

function Brand({ light = false }: { light?: boolean }) {
  const [first, ...rest] = site.brand.toUpperCase().split(' ')
  return (
    <a className={`brand${light ? ' brand--light' : ''}`} href="#inicio" aria-label={`${site.brand}, ir al inicio`}>
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span className="brand-wordmark">{first}{' '}<span>{rest.join(' ')}</span></span>
    </a>
  )
}

function ContactLink({ context = 'general', className = 'button button--brand', children, onClick }: {
  context?: ContactContext; className?: string; children: string; onClick?: () => void
}) {
  const href = getContactHref(context)
  const external = href?.startsWith('https:')
  return <a className={className} href={href ?? '#contacto'} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} onClick={onClick}>{children}<ArrowUpRight size={18} aria-hidden="true" /></a>
}

function DecisionColumns({ items }: { items: readonly { title: string; items: readonly string[] }[] }) {
  return <div className="decision-columns">{items.map((item) => <article key={item.title} data-animate><h3>{item.title}</h3><ul>{item.items.map((text) => <li key={text}>{text}</li>)}</ul></article>)}</div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (open) firstLinkRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="site-header" id="inicio" ref={headerRef} onBlur={(event) => {
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
    }}>
      <div className="shell nav-inner">
        <Brand />
        <nav id="main-navigation" className={`nav-links${open ? ' nav-links--open' : ''}`} aria-label="Navegación principal">
          {site.navigation.map((item, index) => (
            <a key={item.href} ref={index === 0 ? firstLinkRef : undefined} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <ContactLink className="nav-mobile-contact" onClick={() => setOpen(false)}>{site.ctas.header}</ContactLink>
        </nav>
        <ContactLink className="nav-cta">{site.ctas.header}</ContactLink>
        <button ref={menuButtonRef} className="menu-button" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  )
}

function FounderPortrait() {
  const [failed, setFailed] = useState(false)
  const photo = site.founder.photo
  return (
    <figure className="founder-stage" data-animate>
      <div className="portrait">
      {photo && !failed ? <img src={photo} srcSet={site.founder.photoMobile ? `${site.founder.photoMobile} 480w, ${photo} 900w` : undefined} sizes="(max-width: 580px) 88vw, 480px" alt={`Retrato de ${site.founder.name}, fundador de Tiago Systems`} width="900" height="1125" loading="lazy" decoding="async" onError={() => setFailed(true)} /> : (
        <div className="portrait-placeholder" role="img" aria-label={`Monograma de ${site.founder.name}; retrato no disponible`}>
          <span className="portrait-grid" aria-hidden="true" />
          <span className="portrait-initial" aria-hidden="true">T<span>O</span></span>
        </div>
      )}
      </div>
      <figcaption className="founder-identity"><span className="founder-name">{site.founder.name}</span><span className="founder-role">{site.founder.role} · {site.brand}</span></figcaption>
    </figure>
  )
}

function WorkMap() {
  const [active, setActive] = useState(0)
  const item = site.workflow[active]
  return (
    <section className="work-map" aria-labelledby="model-title" data-animate>
      <div className="work-map-intro">
        <span className="eyebrow">{site.copy.model.eyebrow}</span>
        <h2 id="model-title">{site.copy.model.title}</h2>
        <p>{site.copy.model.description}</p>
        <div className="work-map-options" role="group" aria-label="Preguntas sobre el proceso">
          {site.workflow.map((entry, index) => (
            <button key={entry.question} type="button" aria-pressed={active === index} aria-controls="work-map-example" onClick={() => setActive(index)}>
              <span>0{index + 1}</span>{entry.question}<ArrowUpRight size={18} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="model-conclusion">{site.copy.model.conclusion}</p>
      </div>
      <div className="work-map-example" id="work-map-example" aria-live="polite" aria-atomic="true">
        <div className="work-map-content" key={active}>
          <span className="map-index" aria-hidden="true">0{active + 1}</span>
          <span className="eyebrow">LA SITUACIÓN</span>
          <p className="map-problem">{item.problem}</p>
          <h3>{item.decision}</h3>
          <ol className="map-route">{item.steps.map((step) => <li key={step}><span className="map-node" aria-hidden="true" />{step}</li>)}</ol>
          <p className="map-output">{item.output}</p>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  return (
    <section className="faq section-cream" id="preguntas" aria-labelledby="faq-title">
      <div className="shell faq-grid">
        <div className="faq-heading" data-animate>
          <span className="eyebrow">{site.copy.faq.eyebrow}</span>
          <h2 id="faq-title">{site.copy.faq.title}<br /><em>{site.copy.faq.accent}</em></h2>
          <p>{site.copy.faq.description}</p>
        </div>
        <div className="faq-list" data-animate>
          {site.questions.map((item, index) => (
            <div className={`faq-item${openIndex === index ? ' faq-item--open' : ''}`} key={item.question}>
              <h3>
                <button type="button" id={`faq-trigger-${index}`} aria-expanded={openIndex === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpenIndex((current) => current === index ? null : index)}>
                  <span className="faq-number">0{index + 1}</span><span>{item.question}</span><ChevronDown size={21} aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-trigger-${index}`} aria-hidden={openIndex !== index}>
                <div><p>{item.answer}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function App() {
  useEntranceMotion()
  const [demo, dispatchDemo] = useReducer(demoReducer, undefined, createInitialState)

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <div className="hero-grid-pattern" aria-hidden="true" />
          <div className="shell hero-layout">
            <div className="hero-copy">
              <span className="eyebrow eyebrow--brand">{site.hero.eyebrow}</span>
              <h1 id="hero-title">{site.hero.title}<span className="brand-dot">.</span></h1>
              <p>{site.hero.description}</p>
              <div className="hero-actions">
                <div className="hero-primary"><ContactLink>{site.ctas.primary}</ContactLink><p className="cta-microcopy">{site.hero.microcopy}</p></div>
                <a className="button button--dark" href="#dentflow">{site.ctas.demo} <ArrowDownRight size={18} aria-hidden="true" /></a>
              </div>
              <div className="hero-credit"><span>{site.founder.name.toUpperCase()}</span><span>{site.founder.role}</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-top"><span className="signal-dot" /> PRODUCTO DESTACADO <span>01 / DENTFLOW</span></div>
              <div className="hero-screen">
                <div className="hero-screen-bar"><span className="screen-dots"><i /><i /><i /></span><span>dentflow / resumen</span><span>VISTA 01</span></div>
                <HeroPreview state={demo} />
              </div>
              <div className="hero-visual-bottom"><span>DEMO INTERACTIVA · DATOS FICTICIOS</span><span>OPERACIÓN MÁS VISIBLE <ArrowUpRight size={16} /></span></div>
            </div>
          </div>
          <div className="shell hero-footer"><span>TECNOLOGÍA PARA EL TRABAJO REAL</span><a href="#enfoque">DESLIZÁ PARA EXPLORAR <ArrowDownRight size={16} /></a></div>
        </section>

        <section className="approach section-light" id="enfoque" aria-labelledby="approach-title">
          <div className="shell">
            <div className="section-heading approach-heading" data-animate>
              <span className="eyebrow">{site.copy.approach.eyebrow}</span>
              <h2 id="approach-title">{site.copy.approach.title} <em>{site.copy.approach.accent}</em></h2>
              <p>{site.copy.approach.description}</p>
            </div>
            <div className="issue-grid issue-grid--problems">
              {site.issues.map((issue) => (
                <article className="issue" key={issue.number} data-animate>
                  <span className="issue-number">{issue.number} / 04</span>
                  <h3>{issue.title}</h3>
                  <p>{issue.text}</p>
                </article>
              ))}
            </div>
            <div className="approach-note" data-animate><span className="note-symbol" aria-hidden="true">✳</span><p>{site.copy.approach.note}</p></div>
            <WorkMap />
          </div>
        </section>

        <section className="product section-dark" id="dentflow" aria-labelledby="product-title">
          <div className="shell">
            <div className="section-heading product-heading" data-animate>
              <div><span className="eyebrow eyebrow--brand">{site.copy.product.eyebrow}</span><h2 id="product-title">{site.copy.product.title} <em>{site.copy.product.accent}</em></h2></div>
              <p>{site.copy.product.description}</p>
            </div>
            <div className="demo-intro" data-animate><p><strong>{site.copy.product.demoLead}</strong> {site.copy.product.demoInstructions}</p><a className="text-link" href="#demo-crm" onClick={() => dispatchDemo({ type: 'startTour' })}>Probar ese recorrido <ArrowDownRight size={18} aria-hidden="true" /></a></div>
            <p className="demo-disclosure">{site.copy.product.demoNotice}</p>
            <DentFlowDemo state={demo} dispatch={dispatchDemo} />
            <div className="demo-next-step" data-animate><p>{site.copy.product.afterDemo}</p><ContactLink context="demo">{site.ctas.afterDemo}</ContactLink></div>
            <div className="product-links">
              <nav className="social-links" aria-label="Redes de DentFlow"><span>SEGUÍ DENTFLOW</span><a href={site.social.dentflowInstagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={15} aria-hidden="true" /></a><a href={site.social.dentflowTikTok} target="_blank" rel="noopener noreferrer">TikTok <ArrowUpRight size={15} aria-hidden="true" /></a></nav>
            </div>
          </div>
        </section>

        <section className="approach section-dark" id="equipo" aria-labelledby="roles-title">
          <div className="shell">
            <div className="section-heading approach-heading" data-animate><span className="eyebrow">{site.copy.roles.eyebrow}</span><h2 id="roles-title">{site.copy.roles.title}</h2><p>{site.copy.roles.description}</p></div>
            <DecisionColumns items={site.roles} />
          </div>
        </section>

        <section className="process section-light" id="proceso" aria-labelledby="process-title">
          <div className="shell">
            <div className="section-heading process-heading" data-animate><span className="eyebrow">{site.copy.process.eyebrow}</span><h2 id="process-title">{site.copy.process.title} <em>{site.copy.process.accent}</em></h2><p>{site.copy.process.description}</p></div>
            <div className="steps">
              {site.steps.map((step) => (
                <article className="step" key={step.number} data-animate><span className="step-number">{step.number}</span><div className="step-body"><h3>{step.title}</h3><p>{step.text}</p></div><ArrowRight size={23} strokeWidth={1.5} aria-hidden="true" /></article>
              ))}
            </div>
            <div className="human-note" data-animate><span className="human-note-icon"><Check size={24} /></span><p><strong>El seguimiento sigue siendo humano.</strong> DentFlow prepara y ordena; recepción revisa cada caso y decide qué mensaje enviar.</p></div>
          </div>
        </section>

        <section className="approach section-dark" id="prueba" aria-labelledby="proof-title">
          <div className="shell">
            <div className="section-heading approach-heading" data-animate><span className="eyebrow">{site.copy.proof.eyebrow}</span><h2 id="proof-title">{site.copy.proof.title}</h2><p>{site.copy.proof.description}</p></div>
            <div className="issue-grid">{site.proof.map((item) => <article className="issue" key={item.number} data-animate><span className="issue-number">{item.number} / 03</span><h3>{item.title}</h3><p>{item.text}</p><a className="text-link" href={item.href}>{item.cta}<ArrowUpRight size={18} aria-hidden="true" /></a></article>)}</div>
          </div>
        </section>

        <section className="approach section-light" id="para-tu-clinica" aria-labelledby="fit-title">
          <div className="shell">
            <div className="section-heading approach-heading" data-animate><span className="eyebrow">{site.copy.fit.eyebrow}</span><h2 id="fit-title">{site.copy.fit.title}</h2><p>{site.copy.fit.description}</p></div>
            <DecisionColumns items={site.fit} />
            <div className="human-note" data-animate><span className="human-note-icon"><Check size={24} aria-hidden="true" /></span><p>{site.copy.fit.note}</p></div>
          </div>
        </section>

        <section className="founder section-dark" id="sobre-tiago" aria-labelledby="founder-title">
          <div className="shell">
            <div className="founder-heading" data-animate>
              <span className="eyebrow eyebrow--brand">{site.copy.founder.eyebrow}</span>
              <h2 id="founder-title">{site.copy.founder.title}</h2>
            </div>
            <FounderPortrait />
            <div className="founder-copy" data-animate>
              <div><p className="founder-lead">{site.copy.founder.lead}</p><p>{site.copy.founder.body}</p></div>
              <div><p>{site.copy.founder.productBefore}<strong>{site.copy.founder.productEmphasis}</strong>.</p><p>{site.copy.founder.iteration}</p></div>
              <blockquote>{site.copy.founder.quote}</blockquote>
              <div className="founder-links"><a className="founder-social" href={site.social.tiagoInstagram} target="_blank" rel="noopener noreferrer">Seguir el proceso →</a><a className="founder-social" href="#dentflow">Conocer DentFlow →</a></div>
            </div>
          </div>
        </section>

        <Faq />

        {site.resource && <section className="approach section-dark" id="recurso" aria-labelledby="resource-title"><div className="shell"><div className="section-heading" data-animate><span className="eyebrow">RECURSO GRATUITO</span><h2 id="resource-title">{site.resource.title}</h2><p>{site.resource.description}</p><a className="text-link" href={site.resource.url} target="_blank" rel="noopener noreferrer">{site.resource.cta}<ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>}

        <section className="contact" id="contacto" aria-labelledby="contact-title">
          <div className="shell contact-layout" data-animate>
            <div><span className="eyebrow">{site.copy.contact.eyebrow}</span><h2 id="contact-title">{site.copy.contact.title} <em>{site.copy.contact.accent}</em></h2></div>
            <div className="contact-aside"><p>{site.copy.contact.description}</p>
              {getContactHref('final') ? <ContactLink context="final">{site.ctas.final}</ContactLink> : <div className="contact-pending">Canal de contacto directo próximamente.</div>}
              <a className="contact-secondary" href="#demo-crm">Volver a la demo <ArrowDownRight size={18} aria-hidden="true" /></a>
              {site.contact.linkedin && <a className="contact-secondary" href={site.contact.linkedin} target="_blank" rel="noopener noreferrer">Ver perfil profesional <ExternalLink size={16} /></a>}
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="shell footer-main"><Brand light /><a href="#inicio">Volver arriba <ArrowUpRight size={17} /></a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} TIAGO SYSTEMS</span><span>TECNOLOGÍA PARA EL TRABAJO REAL.</span></div></footer>
    </>
  )
}

export default App
