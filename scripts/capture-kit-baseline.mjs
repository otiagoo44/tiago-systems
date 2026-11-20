import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const out = 'docs/design/evidence/kit'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, headless: true })
const report = []
for (const base of ['http://localhost:5173', 'https://tiago-systems.vercel.app']) {
  const page = await browser.newPage()
  for (const [width, height] of [[320,800],[360,800],[390,844],[768,900],[1440,900]]) {
    await page.setViewportSize({ width, height })
    try {
      await page.goto(base, { waitUntil: 'networkidle', timeout: 30000 })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(1200)
      const label = base.includes('localhost') ? 'before' : 'production'
      await page.screenshot({ path: `${out}/${label}-${width}.png` })
      report.push({ base, width, ...await page.evaluate(() => ({ title: document.title, scrollWidth: document.documentElement.scrollWidth, cta: document.querySelector('.hero-primary a')?.getBoundingClientRect().toJSON(), links: [...document.querySelectorAll('a')].map(a => ({ text: a.textContent, href: a.getAttribute('href') })), forms: document.forms.length, overflow: [...document.querySelectorAll('main *')].filter(el => { const r=el.getBoundingClientRect(); return r.width && (r.right>innerWidth+1 || r.left < -1) }).map(el=>el.className).slice(0,12), animations: document.getAnimations().map(a=>({ target:a.effect?.target?.className, timing:a.effect?.getTiming() })) })) })
    } catch(error) { report.push({base,width,error:error.message}) }
  }
  await page.close()
}
writeFileSync(`${out}/baseline.json`, JSON.stringify(report, null, 2))
await browser.close()
console.log(report.map(({base,width,scrollWidth,cta,error})=>({base,width,scrollWidth,ctaBottom:cta?.bottom,error})))
