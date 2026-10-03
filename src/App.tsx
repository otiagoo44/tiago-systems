import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ExternalLink,
  Mail,
  Maximize2,
  Menu,
  X,
} from 'lucide-react'
import { contactHref, site, type ProductView } from './siteConfig'

function useEntranceMotion() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !('animate' in document.documentElement)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
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
      <span className="brand-wordmark">{first}<span>{rest.join(' ')}</span></span>
    </a>
  )
}

type MediaFrameProps = {
  src: string | null
  alt: string
  className?: string
  eager?: boolean
  fallback: string
}

function MediaFrame({ src, alt, className = '', eager = false, fallback }: MediaFrameProps) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`media-frame ${className}`}>
      {src && !failed ? (
        <img src={src} alt={alt} width="1672" height="940" loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
      ) : (
        <div className="media-fallback" role="img" aria-label={fallback}>
          <span className="media-fallback-mark">DF</span>
          <span>{fallback}</span>
        </div>
      )}
    </div>
  )
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
    <header className="site-header" id="inicio" ref={headerRef}>
      <div className="shell nav-inner">
        <Brand />
        <nav id="main-navigation" className={`nav-links${open ? ' nav-links--open' : ''}`} aria-label="Navegación principal">
          {site.navigation.map((item, index) => (
            <a key={item.href} ref={index === 0 ? firstLinkRef : undefined} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
          <a className="nav-mobile-contact" href={contactHref ?? '#contacto'} target={contactHref ? '_blank' : undefined} rel={contactHref ? 'noopener noreferrer' : undefined} onClick={() => setOpen(false)}>Contacto <ArrowUpRight size={18} /></a>
        </nav>
        <a className="nav-cta" href={contactHref ?? '#contacto'} target={contactHref ? '_blank' : undefined} rel={contactHref ? 'noopener noreferrer' : undefined}>Hablemos <ArrowUpRight size={17} /></a>
        <button ref={menuButtonRef} className="menu-button" type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  )
}

function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const dialogRef = useRef<HTMLDialogElement>(null)
  const enlargeRef = useRef<HTMLButtonElement>(null)
  const view = site.product.views[activeIndex]

  const selectTab = (index: number) => {
    setActiveIndex(index)
    tabsRef.current[index]?.focus()
  }

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number | null = null
    if (event.key === 'ArrowRight') next = (index + 1) % site.product.views.length
    if (event.key === 'ArrowLeft') next = (index - 1 + site.product.views.length) % site.product.views.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = site.product.views.length - 1
    if (next !== null) {
      event.preventDefault()
      selectTab(next)
    }
  }

  return (
    <>
      <div className="gallery" data-animate>
        <div className="gallery-topline">
          <span className="gallery-index">EXPLORÁ EL PRODUCTO</span>
          <span className="gallery-note">Pantallas adaptadas · datos de ejemplo</span>
        </div>
        <div className="product-tabs" role="tablist" aria-label="Vistas de DentFlow">
          {site.product.views.map((item, index) => (
            <button
              key={item.id}
              ref={(element) => { tabsRef.current[index] = element }}
              type="button"
              className={`product-tab${activeIndex === index ? ' product-tab--active' : ''}`}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={activeIndex === index}
              aria-controls="product-panel"
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              <span>0{index + 1}</span>{item.tab}<ArrowUpRight size={17} aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="product-panel" id="product-panel" role="tabpanel" aria-labelledby={`tab-${view.id}`} tabIndex={0}>
          <div className="product-panel-copy" key={view.id}>
            <span className="eyebrow eyebrow--orange">{view.eyebrow}</span>
            <h3>{view.title}</h3>
            <p>{view.description}</p>
            <div className="gallery-controls">
              <button ref={enlargeRef} className="view-image" type="button" onClick={() => dialogRef.current?.showModal()}>
                Ampliar pantalla <Maximize2 size={17} />
              </button>
            </div>
          </div>
          <div className="product-image-wrap" key={`image-${view.id}`}>
            <MediaFrame src={view.image} alt={view.alt} fallback={`Vista ${view.tab} no disponible`} />
            <div className="image-caption"><span>CAPTURA ADAPTADA</span><span>{view.detail}</span></div>
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} className="image-dialog" aria-label={`Vista ampliada: ${view.tab}`} onClose={() => enlargeRef.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}>
        <div className="dialog-top"><span>{view.tab} / datos de ejemplo</span><a href={view.image} target="_blank" rel="noopener noreferrer">Abrir imagen completa <ExternalLink size={16} /></a><button type="button" aria-label="Cerrar imagen ampliada" onClick={() => dialogRef.current?.close()}><X size={22} /></button></div>
        <MediaFrame key={`dialog-${view.id}`} src={view.image} alt={view.alt} fallback={`Vista ${view.tab} no disponible`} eager />
      </dialog>
    </>
  )
}

function FounderPortrait() {
  const [failed, setFailed] = useState(false)
  const photo = site.founder.photo
  return (
    <div className="portrait" data-animate>
      {photo && !failed ? <img src={photo} alt={`Retrato de ${site.founder.name}`} width="800" height="960" loading="lazy" onError={() => setFailed(true)} /> : (
        <div className="portrait-placeholder" role="img" aria-label={`Espacio reservado para una futura foto profesional de ${site.founder.name}`}>
          <span className="portrait-grid" aria-hidden="true" />
          <span className="portrait-initial" aria-hidden="true">T<span>O</span></span>
          <span className="portrait-placeholder-note">RETRATO<br />PRÓXIMAMENTE</span>
        </div>
      )}
      <div className="portrait-caption"><span>{site.founder.name.toUpperCase()}</span><span>01 / FUNDADOR</span></div>
    </div>
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
  const heroView: ProductView = site.product.views[0]

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <section className="hero section-dark" aria-labelledby="hero-title">
          <div className="hero-grid-pattern" aria-hidden="true" />
          <div className="shell hero-layout">
            <div className="hero-copy">
              <span className="eyebrow eyebrow--orange">{site.hero.eyebrow}</span>
              <h1 id="hero-title">{site.hero.title.before} <span>{site.hero.title.accent}</span> {site.hero.title.after}<span className="orange-dot">.</span></h1>
              <p>{site.hero.description}</p>
              <div className="hero-actions">
                <a className="button button--orange" href={contactHref ?? '#contacto'} target={contactHref ? '_blank' : undefined} rel={contactHref ? 'noopener noreferrer' : undefined}>Hablemos de tu proyecto <ArrowUpRight size={19} /></a>
                <a className="text-link" href="#dentflow">Conocé DentFlow <ArrowDownRight size={18} /></a>
              </div>
              <div className="hero-credit"><span>{site.founder.name.toUpperCase()}</span><span>{site.founder.role}</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual-top"><span className="signal-dot" /> PRODUCTO DESTACADO <span>01 / DENTFLOW</span></div>
              <div className="hero-screen">
                <div className="hero-screen-bar"><span className="screen-dots"><i /><i /><i /></span><span>dentflow / resumen</span><span>VISTA 01</span></div>
                <MediaFrame src={heroView.image} alt={heroView.alt} fallback="Vista del producto no disponible" eager />
              </div>
              <div className="hero-visual-bottom"><span>CAPTURA ADAPTADA · DATOS DE EJEMPLO</span><span>OPERACIÓN MÁS VISIBLE <ArrowUpRight size={16} /></span></div>
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
            <div className="issue-grid">
              {site.issues.map((issue) => (
                <article className="issue" key={issue.number} data-animate>
                  <span className="issue-number">{issue.number} / 03</span>
                  <h3>{issue.title}</h3>
                  <p>{issue.text}</p>
                </article>
              ))}
            </div>
            <div className="approach-note" data-animate><span className="note-symbol" aria-hidden="true">✳</span><p>{site.copy.approach.note}</p></div>
          </div>
        </section>

        <section className="product section-dark" id="dentflow" aria-labelledby="product-title">
          <div className="shell">
            <div className="section-heading product-heading" data-animate>
              <div><span className="eyebrow eyebrow--orange">{site.copy.product.eyebrow}</span><h2 id="product-title">{site.copy.product.title} <em>{site.copy.product.accent}</em></h2></div>
              <p>{site.copy.product.description}</p>
            </div>
            <ProductGallery />
            <div className="product-bottom" data-animate>
              <div><span className="eyebrow eyebrow--orange">LO QUE HACE</span><h3>{site.copy.product.capabilitiesTitle}</h3></div>
              <div className="capability-list">
                {site.capabilities.map(({ icon: Icon, title, text }) => (
                  <div className="capability" key={title}><Icon size={24} strokeWidth={1.6} aria-hidden="true" /><div><h4>{title}</h4><p>{text}</p></div></div>
                ))}
              </div>
            </div>
            <div className="product-links">
              {site.product.crmUrl && <a className="product-access" href={site.product.crmUrl} target="_blank" rel="noopener noreferrer">Acceder al CRM de DentFlow <ExternalLink size={17} /><span>Acceso al sistema, separado de esta presentación.</span></a>}
              <div className="social-links" aria-label="Redes de DentFlow"><span>SEGUÍ DENTFLOW</span><a href={site.social.dentflowInstagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={15} /></a><a href={site.social.dentflowTikTok} target="_blank" rel="noopener noreferrer">TikTok <ArrowUpRight size={15} /></a></div>
            </div>
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

        <section className="founder section-dark" id="sobre-tiago" aria-labelledby="founder-title">
          <div className="shell founder-grid">
            <FounderPortrait />
            <div className="founder-copy" data-animate>
              <span className="eyebrow eyebrow--orange">{site.copy.founder.eyebrow}</span>
              <h2 id="founder-title">Soy {site.founder.name}<span className="orange-dot">.</span></h2>
              <p className="founder-lead">{site.copy.founder.lead}</p>
              <p>{site.copy.founder.body}</p>
              <p>{site.copy.founder.values}</p>
              <div className="founder-signature"><span className="signature-line" /><div><strong>{site.founder.name.toUpperCase()}</strong><span>{site.founder.role}</span></div></div>
              <a className="founder-social" href={site.social.tiagoTikTok} target="_blank" rel="noopener noreferrer">Tiago Systems en TikTok <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <Faq />

        <section className="contact" id="contacto" aria-labelledby="contact-title">
          <div className="shell contact-layout" data-animate>
            <div><span className="eyebrow">{site.copy.contact.eyebrow}</span><h2 id="contact-title">{site.copy.contact.title} <em>{site.copy.contact.accent}</em></h2></div>
            <div className="contact-aside"><p>{site.copy.contact.description}</p>
              {contactHref ? <a className="button button--dark" href={contactHref} target={site.contact.whatsapp && !site.contact.email ? '_blank' : undefined} rel={site.contact.whatsapp && !site.contact.email ? 'noopener noreferrer' : undefined}>{site.contact.email ? 'Escribime por email' : 'Hablemos por WhatsApp'} {site.contact.email ? <Mail size={20} /> : <ArrowUpRight size={20} />}</a> : <div className="contact-pending">Canal de contacto directo próximamente.</div>}
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
