/** Progressive enhancement: content is hidden only after a working observer exists. */
export function initScrollReveals(selector = '[data-animate]') {
  if (!('IntersectionObserver' in window) || !('animate' in document.documentElement)) return () => {}
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reducedMotion.matches) return () => {}

  // Animate a group or its children, never both: avoids doubled motion/opacity.
  const targets = [...document.querySelectorAll<HTMLElement>(selector)]
    .filter(element => !element.parentElement?.closest(selector))
  const pending = new Set<HTMLElement>()
  const animations = new Map<HTMLElement, Animation>()
  let pointerFocus = false
  const tokens = getComputedStyle(document.documentElement)
  // CSS minification can normalize 650ms to .65s. WAAPI expects milliseconds.
  const cssDuration = tokens.getPropertyValue('--motion-reveal').trim()
  const duration = Number.parseFloat(cssDuration) * (cssDuration.endsWith('ms') ? 1 : 1000) || 650
  const easing = tokens.getPropertyValue('--motion-ease').trim() || 'cubic-bezier(.2,.7,.2,1)'
  const desktop = window.matchMedia('(min-width: 761px)').matches
  const delays = new Map(targets.map(element => {
    const siblings = [...(element.parentElement?.children ?? [])].filter(sibling => targets.includes(sibling as HTMLElement))
    return [element, desktop ? Math.min(siblings.indexOf(element) * 40, 120) : 0]
  }))

  const reveal = (element: HTMLElement, animate = true) => {
    animations.get(element)?.cancel()
    animations.delete(element)
    const wasPending = pending.delete(element)
    element.classList.remove('reveal-pending')
    element.dataset.revealState = 'revealed'
    observer.unobserve(element)
    if (!wasPending || !animate || reducedMotion.matches) return
    const animation = element.animate(
      [{ opacity: 0, transform: 'translate3d(0,24px,0)' }, { opacity: 1, transform: 'translate3d(0,0,0)' }],
      { duration, delay: delays.get(element), easing, fill: 'backwards' },
    )
    animations.set(element, animation)
    animation.onfinish = () => animations.delete(element)
    animation.oncancel = () => animations.delete(element)
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement)
  }, { rootMargin: '0px 0px -48px 0px', threshold: 0 })

  const revealTarget = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return
    const element = target.closest<HTMLElement>('[data-reveal-state]')
    if (element) reveal(element, false)
  }
  // Do not move a clicked control between pointerdown and pointerup. Keyboard
  // and programmatic focus still reveal immediately, without waiting for motion.
  const onPointerDown = () => { pointerFocus = true }
  const onPointerEnd = () => { pointerFocus = false }
  const onFocus = (event: FocusEvent) => { if (!pointerFocus) revealTarget(event.target) }
  const onHash = () => {
    try { revealTarget(document.getElementById(decodeURIComponent(location.hash.slice(1)))) }
    catch { /* A malformed fragment must not break the rest of the page. */ }
  }
  const showEverything = () => {
    for (const element of targets) reveal(element, false)
    observer.disconnect()
  }
  const onPreference = () => { if (reducedMotion.matches) showEverything() }
  const cleanup = () => {
    showEverything()
    targets.forEach(element => { delete element.dataset.revealState })
    document.removeEventListener('focusin', onFocus)
    document.removeEventListener('pointerdown', onPointerDown, true)
    document.removeEventListener('pointerup', onPointerEnd, true)
    document.removeEventListener('pointercancel', onPointerEnd, true)
    document.removeEventListener('keydown', onPointerEnd, true)
    window.removeEventListener('hashchange', onHash)
    reducedMotion.removeEventListener('change', onPreference)
  }

  // Measure before writing styles. The entire initial viewport stays visible;
  // this also handles browser scroll restoration and direct fragment visits.
  const belowFold = targets.filter(element => {
    const rect = element.getBoundingClientRect()
    return rect.width > 0 && rect.height > 0 && rect.top >= window.innerHeight
  })
  targets.forEach(element => { element.dataset.revealState = 'revealed' })
  document.addEventListener('focusin', onFocus)
  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('pointerup', onPointerEnd, true)
  document.addEventListener('pointercancel', onPointerEnd, true)
  document.addEventListener('keydown', onPointerEnd, true)
  window.addEventListener('hashchange', onHash)
  reducedMotion.addEventListener('change', onPreference)
  try {
    for (const element of belowFold) {
      pending.add(element)
      element.dataset.revealState = 'pending'
      element.classList.add('reveal-pending')
      observer.observe(element)
    }
    onHash()
  } catch {
    cleanup()
  }
  return cleanup
}
