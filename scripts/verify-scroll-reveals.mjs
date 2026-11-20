import { createRequire } from 'node:module'
import { mkdirSync, writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.QA_URL || 'http://localhost:4180'
const out = process.env.QA_OUTPUT || 'docs/design/evidence/motion'
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE })
const report = { base, checkedAt: new Date().toISOString(), cases: [], errors: [] }
try {
  for (const width of [390,768,1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    page.on('pageerror', error => report.errors.push(error.message))
    for (const path of ['/', '/recursos/']) {
      console.log(`Motion ${path} ${width}`)
      const name = path === '/' ? 'landing' : 'resources'
      const targetSelector = path === '/' ? '#prueba .issue' : '#checklist'
      await page.goto(base+path, { waitUntil: 'networkidle' })
      await page.waitForTimeout(750)
      const pending = await page.locator('.reveal-pending').count()
      assert.ok(pending > 6, 'Below-fold content waits for scroll')
      assert.equal(await page.locator('h1').evaluate(el=>getComputedStyle(el).opacity),'1')
      assert.equal(await page.locator('.hero-primary a,.resource-hero-actions > .button').evaluate(el=>getComputedStyle(el).opacity),'1')
      const target = page.locator(targetSelector).first()
      assert.equal(await target.evaluate(el=>getComputedStyle(el).opacity),'0')
      await page.screenshot({ path:`${out}/after-${name}-${width}.png` })

      // Trigger a real intersection, freeze the native animation midway for a
      // reproducible screenshot, then finish it. No mocked animation engine.
      await target.evaluate(el => { document.documentElement.style.scrollBehavior='auto'; window.scrollTo({top:el.getBoundingClientRect().top+scrollY-190,behavior:'instant'}) })
      await page.waitForFunction(selector=>{
        const animation=document.querySelector(selector).getAnimations()[0]
        if(!animation) return false
        animation.pause(); animation.currentTime=220
        return true
      },targetSelector)
      const animation = await target.evaluate(el=>{
        const a=el.getAnimations()[0]; a.pause(); a.currentTime=220;
        return {duration:a.effect.getTiming().duration,delay:a.effect.getTiming().delay,frames:a.effect.getKeyframes().map(x=>({opacity:x.opacity,transform:x.transform}))}
      })
      assert.equal(animation.duration,650)
      assert.ok(animation.delay<=120)
      assert.equal(animation.frames[0].opacity,'0')
      const intermediate = await target.evaluate(el=>Number(getComputedStyle(el).opacity))
      assert.ok(intermediate>0 && intermediate<1)
      await page.screenshot({ path:`${out}/enter-${name}-${width}.png` })
      await target.evaluate(el=>el.getAnimations().forEach(a=>a.finish()))
      assert.equal(await target.evaluate(el=>getComputedStyle(el).opacity),'1')
      await page.waitForTimeout(800)
      await page.screenshot({ path:`${out}/revealed-${name}-${width}.png` })
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width)

      // A completed block stays visible on revisits; it does not blink/replay.
      await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}))
      await target.evaluate(el=>el.scrollIntoView({behavior:'instant',block:'center'}))
      await page.waitForTimeout(100)
      assert.equal(await target.evaluate(el=>el.getAnimations().length),0)
      assert.equal(await target.evaluate(el=>getComputedStyle(el).opacity),'1')

      // Keyboard focus cannot land in an invisible block, even before reveal.
      await page.goto(base+path, { waitUntil:'networkidle' })
      const focused = await page.locator('.reveal-pending').evaluateAll(elements=>{
        const parent=elements.find(el=>el.querySelector('a,button,summary'))
        const control=parent.querySelector('a,button,summary')
        control.focus()
        return {opacity:getComputedStyle(parent).opacity,focused:document.activeElement===control}
      })
      assert.deepEqual(focused,{opacity:'1',focused:true})

      // Toggling the preference shows every pending block immediately.
      await page.emulateMedia({reducedMotion:'reduce'})
      await page.waitForFunction(()=>!document.querySelector('.reveal-pending'))
      assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0)
      await page.screenshot({path:`${out}/reduced-${name}-${width}.png`})
      await page.emulateMedia({reducedMotion:'no-preference'})
      report.cases.push({path,width,pending,intermediate,animation,passed:true})
    }
    await page.close()
  }
  // Direct links reveal their destination without exposing all later content.
  const fragmentPage=await browser.newPage({viewport:{width:390,height:844}})
  await fragmentPage.goto(base+'/recursos/#checklist',{waitUntil:'networkidle'})
  await fragmentPage.waitForTimeout(800)
  assert.equal(await fragmentPage.locator('#checklist').evaluate(el=>getComputedStyle(el).opacity),'1')
  await fragmentPage.close()

  for(const mode of ['no-js','no-observer','observer-error','reduced']) {
    const context=await browser.newContext({javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced'?'reduce':'no-preference',viewport:{width:390,height:844}})
    if(mode==='no-observer') await context.addInitScript(()=>{delete window.IntersectionObserver})
    if(mode==='observer-error') await context.addInitScript(()=>{window.IntersectionObserver=class{observe(){throw Error('unsupported observer')}unobserve(){}disconnect(){}}})
    const page=await context.newPage()
    page.on('pageerror', error=>report.errors.push(error.message))
    for(const path of ['/','/recursos/']) {
      await page.goto(base+path,{waitUntil:'networkidle'})
      assert.equal(await page.locator('.reveal-pending').count(),0,`${mode}: all content available`)
      if(path==='/recursos/') {
        assert.equal(await page.locator('#checklist').evaluate(el=>getComputedStyle(el).opacity),'1')
        await page.locator('#checklist summary').first().click()
        assert.equal(await page.locator('.checklist-reading ol li').count(),9)
      }
    }
    await context.close()
  }
  assert.deepEqual(report.errors,[])
  report.passed=true
} catch(error) {report.passed=false;report.failure=error.stack;throw error}
finally {writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2)+'\n');await browser.close();console.log(JSON.stringify(report,null,2))}
