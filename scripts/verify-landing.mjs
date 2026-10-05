// Run against the production preview. Uses an existing Playwright installation;
// no browser package is added to the landing's dependencies.
// PLAYWRIGHT_MODULE may point to an external playwright or playwright-core entry.
import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.QA_URL || 'http://localhost:4173'
const output = 'docs/design/evidence/conversion'
mkdirSync(output, { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE })
const report = { base, checkedAt: new Date().toISOString(), viewports: [], interactions: [], errors: [], failedRequests: [], forbiddenRequests: [] }
const page = await browser.newPage()
page.on('pageerror', error => report.errors.push(error.message))
page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()) })
page.on('requestfailed', request => report.failedRequests.push({ url: request.url(), error: request.failure()?.errorText }))
page.on('request', request => {
  if (/wa\.me|supabase\.|dental-crm-one\.vercel\.app/.test(request.url())) report.forbiddenRequests.push(request.url())
})
const check = (name) => report.interactions.push(name)
const expectText = async (selector, text) => assert.ok((await page.locator(selector).innerText()).includes(text), `${selector}: ${text}`)
const button = name => page.getByRole('button', { name, exact: true })

try {
  for (const width of [375, 430, 768, 1024, 1440]) {
    console.log(`Checking ${width}px`)
    await page.setViewportSize({ width, height: 900 })
    await page.goto(base, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.getByRole('heading', { level: 1 }).waitFor()
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero h1')).opacity === '1' && getComputedStyle(document.querySelector('.hero-visual')).opacity === '1')
    await page.screenshot({ path: `${output}/hero-${width}.png` })
    const layout = await page.evaluate(() => ({
      width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
      h1: document.querySelector('h1').textContent,
      overflow: [...document.querySelectorAll('main *, header *, footer *')].filter(el => {
        const r = el.getBoundingClientRect(); const s = getComputedStyle(el)
        return r.width > 0 && s.visibility !== 'hidden' && (r.right > innerWidth + 1 || r.left < -1)
      }).map(el => `${el.tagName}.${el.className}`).slice(0, 20),
      brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).map(a => a.hash),
      primary: document.querySelector('.hero-primary .button').getBoundingClientRect().toJSON(),
    }))
    assert.equal(layout.scrollWidth, width, `Horizontal overflow at ${width}`)
    assert.deepEqual(layout.overflow, [], `Content outside viewport at ${width}`)
    assert.deepEqual(layout.brokenAnchors, [])
    for (const selector of ['#enfoque', '#dentflow', '#equipo', '#proceso', '#prueba', '#para-tu-clinica', '#sobre-tiago', '#preguntas', '#contacto', '.footer']) {
      const section = page.locator(selector)
      await section.scrollIntoViewIfNeeded()
      if (selector === '#sobre-tiago') {
        await page.waitForFunction(() => {
          const img = document.querySelector('.portrait img')
          return img?.complete && img.naturalWidth > 0
        })
        assert.ok(await page.locator('.portrait img').getAttribute('alt'))
        assert.equal(await page.locator('.founder-name').innerText(), 'Tiago Ortega')
      }
      // Wait only for the existing entrance transition to finish before recording.
      await page.waitForTimeout(700)
      if (width === 375 || width === 1440) await section.screenshot({ path: `${output}/${selector.replace(/[#.]/g, '')}-${width}.png`, style: '.site-header, .skip-link { opacity: 0 !important; }' })
    }
    report.viewports.push(layout)
    if (width === 375 || width === 1440) {
      await page.getByRole('tab', { name: 'Pacientes', exact: false }).click()
      await page.getByLabel('Buscar consulta').fill('ines')
      await expectText('.crm-patients', 'Inés Demo')
      assert.equal(await page.locator('.crm-patient').count(), 1)
      await page.getByLabel('Buscar consulta').fill('no existe')
      await expectText('.crm-empty', 'No encontramos consultas')
      await button('Limpiar filtros').first().click()
      assert.equal(await page.locator('.crm-patient').count(), 10)
      await page.getByLabel('Buscar consulta').fill('Ana')
      await page.getByRole('combobox', { name: /^Tratamiento/ }).selectOption('Implantes')
      await page.getByRole('combobox', { name: /^Fuente/ }).selectOption('Instagram')
      await page.locator('.crm-patient').click()
      await expectText('.crm-detail', 'Recepción A')
      await button('Simular WhatsApp').click()
      assert.equal(await page.locator('dialog[open]').count(), 1)
      await page.keyboard.press('Escape')
      assert.equal(await page.locator('dialog[open]').count(), 0)
      assert.equal(await button('Simular WhatsApp').evaluate(el => el === document.activeElement), true)
      await button('Simular WhatsApp').click()
      await page.locator('dialog').screenshot({ path: `${output}/dialog-${width}.png` })
      // Keyboard focus remains in the native dialog, including wraparound.
      await button('Cancelar').focus()
      await page.keyboard.press('Tab')
      assert.equal(await button('Cerrar diálogo').evaluate(el => el === document.activeElement), true)
      await page.keyboard.press('Shift+Tab')
      assert.equal(await button('Cancelar').evaluate(el => el === document.activeElement), true)
      await button('Simular envío').click()
      await expectText('.crm-detail', 'No se envió ningún mensaje real')
      assert.deepEqual(await page.locator('.crm-preview-metrics strong').allTextContents(), ['10', '9', '6'])
      await button('Registrar resultado').click()
      await page.getByLabel('¿Qué pasó con la consulta?').selectOption('scheduled')
      await page.getByLabel('Fecha y hora de la cita').fill('2026-10-01T10:30')
      await button('Guardar resultado').click()
      await expectText('[role="alert"]', 'posteriores al reloj')
      await page.getByLabel('Fecha y hora de la cita').fill('2026-10-05T10:30')
      await button('Guardar resultado').click()
      await expectText('.crm-next', 'Registrar asistencia')
      assert.deepEqual(await page.locator('.crm-preview-metrics strong').allTextContents(), ['10', '9', '7'])
      await button('Registrar asistencia').click()
      await button('Guardar resultado').click()
      await expectText('.crm-next', 'Preparar presupuesto')
      await page.getByRole('tab', { name: 'Análisis', exact: true }).click()
      for (const tab of ['Fuentes', 'Tratamientos', 'Embudo']) await page.getByRole('tab', { name: tab, exact: true }).click()
      await page.locator('#demo-crm').screenshot({ path: `${output}/analysis-${width}.png`, style: '.site-header, .skip-link { opacity: 0 !important; }' })
      await button('Reiniciar demo').click()
      assert.deepEqual(await page.locator('.crm-preview-metrics strong').allTextContents(), ['10', '8', '6'])
      await page.getByRole('tab', { name: 'Resumen', exact: true }).focus()
      await page.keyboard.press('ArrowRight')
      assert.equal(await page.getByRole('tab', { name: 'Pacientes', exact: false }).getAttribute('aria-selected'), 'true')
      await page.keyboard.press('End')
      assert.equal(await page.getByRole('tab', { name: 'Análisis', exact: true }).getAttribute('aria-selected'), 'true')
      await page.keyboard.press('Home')
      check(`Search, combined/empty filters, contact, cancellation, focus trap/return, invalid/valid appointment, attendance, analysis, shared hero metrics, tabs and reset at ${width}`)
    }
  }

  await button('Ver recorrido guiado').click()
  await page.locator('.crm-guided').click()
  await button('Simular WhatsApp').click()
  await button('Simular envío').click()
  await button('Registrar resultado').click()
  await page.getByLabel('¿Qué pasó con la consulta?').selectOption('scheduled')
  await page.getByLabel('Fecha y hora de la cita').fill('2026-10-05T11:00')
  await button('Guardar resultado').click()
  await expectText('.crm-guide', 'Ahora la consulta tiene un próximo paso.')
  await button('Reiniciar recorrido').click()
  await expectText('.crm-guide', 'Abrí la consulta señalada')
  await button('Cancelar recorrido guiado').click()
  assert.equal(await page.locator('.crm-guide').count(), 0)
  await button('Reiniciar demo').click()
  check('Guided tour, restart and cancellation')

  for (let i = 0; i < 4; i++) {
    const option = page.locator('.work-map-options button').nth(i)
    await option.click()
    assert.equal(await option.getAttribute('aria-pressed'), 'true')
    assert.equal(await page.locator('.work-map-options [aria-pressed=true]').count(), 1)
  }
  for (let i = 0; i < 9; i++) {
    const question = page.locator(`#faq-trigger-${i}`)
    await question.focus()
    if (await question.getAttribute('aria-expanded') === 'false') await page.keyboard.press('Enter')
    assert.equal(await question.getAttribute('aria-expanded'), 'true')
    assert.equal(await page.locator(`#faq-answer-${i}`).getAttribute('aria-hidden'), 'false')
    await page.keyboard.press('Enter')
    assert.equal(await question.getAttribute('aria-expanded'), 'false')
  }
  check('Four-question interactive map and all nine FAQ panels by keyboard')
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(base)
  await button('Abrir menú').click()
  assert.equal(await page.getByRole('link', { name: 'Problema', exact: true }).evaluate(el => el === document.activeElement), true)
  await page.keyboard.press('Escape')
  assert.equal(await button('Abrir menú').evaluate(el => el === document.activeElement), true)
  for (const name of ['Problema', 'DentFlow', 'Cómo funciona', 'FAQ']) {
    await button('Abrir menú').click()
    await page.getByRole('navigation', { name: 'Navegación principal' }).getByRole('link', { name, exact: true }).click()
    assert.equal(await button('Abrir menú').getAttribute('aria-expanded'), 'false')
  }
  check('Mobile menu: focus, Escape, all navigation anchors and close on selection')

  const links = await page.locator('a[href^="https://wa.me/"]').evaluateAll(links => links.map(a => ({ href: a.href, text: a.textContent, target: a.target, rel: a.rel })))
  assert.equal(links.length, 5)
  const messages = new Set()
  for (const link of links) {
    const url = new URL(link.href)
    assert.equal(url.pathname, '/595993367341')
    assert.ok(url.searchParams.get('text')?.startsWith('Hola Tiago.'))
    assert.ok(link.rel.includes('noopener'))
    assert.equal(link.target, '_blank')
    messages.add(url.searchParams.get('text'))
  }
  assert.equal(messages.size, 3)
  // Capture actual click destinations without opening/sending a WhatsApp message.
  await page.evaluate(() => {
    window.__qaLinks = []
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="https://wa.me/"]')
      if (a) { e.preventDefault(); window.__qaLinks.push(a.href) }
    }, true)
  })
  for (const selector of ['.hero-primary a', '.demo-next-step a', '.contact-aside .button']) await page.locator(selector).click()
  assert.equal((await page.evaluate(() => window.__qaLinks)).length, 3)
  check('Five WhatsApp links, three exact contexts, real phone, encoded messages and click destinations; no message sent')

  assert.equal(await page.locator('#recurso').count(), 0)
  assert.equal(await page.locator('html').getAttribute('lang'), 'es-PY')
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), 'https://tiago-systems.vercel.app/')
  const title = await page.title()
  for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) assert.equal(await page.locator(selector).getAttribute('content'), title)
  const description = await page.locator('meta[name=description]').getAttribute('content')
  for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) assert.equal(await page.locator(selector).getAttribute('content'), description)
  for (const asset of ['/favicon.svg', '/social-preview.png']) assert.equal((await page.request.get(base + asset)).status(), 200)
  check('SEO, language, canonical, social metadata, favicon/OG assets and absent resource CTA')

  // The real portrait has a useful fallback if either responsive asset fails.
  assert.deepEqual(report.errors, [])
  await page.route('**/assets/tiago-ortega*.webp', route => route.fulfill({ status: 404, body: '' }))
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.locator('#sobre-tiago').scrollIntoViewIfNeeded()
  await page.locator('.portrait-placeholder').waitFor()
  assert.equal(await page.locator('.founder-name').innerText(), 'Tiago Ortega')
  await page.unroute('**/assets/tiago-ortega*.webp')
  // Exclude only the intentionally failed portrait requests from this fallback check.
  assert.ok(report.errors.every(error => error.includes('404 (Not Found)')), 'Only the expected missing-portrait console errors are allowed')
  report.expectedFallbackErrors = report.errors.splice(0)
  check('Authorized portrait loads at all five widths; responsive sources, alt, stable frame and failed-image fallback')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(base, { waitUntil: 'networkidle' })
  assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior), 'auto')
  assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length), 0)
  await page.screenshot({ path: `${output}/reduced-motion-375.png` })
  check('Reduced motion retains visible content and disables running entrance animations')
  assert.deepEqual(report.errors, [])
  assert.deepEqual(report.failedRequests, [])
  assert.deepEqual(report.forbiddenRequests, [], 'Demo actions must not contact WhatsApp, Supabase or the private CRM')
  report.passed = true
} catch (error) {
  report.passed = false
  report.failure = error.stack
  await page.screenshot({ path: `${output}/failure.png`, fullPage: true })
  throw error
} finally {
  writeFileSync(`${output}/browser-report.json`, JSON.stringify(report, null, 2) + '\n')
  await browser.close()
  console.log(JSON.stringify(report, null, 2))
}
