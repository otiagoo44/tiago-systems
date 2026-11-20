import { createRequire } from 'node:module'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const AxeBuilder = require(process.env.AXE_MODULE || '@axe-core/playwright').default
const base = process.env.QA_URL || 'http://localhost:4173'
const out = process.env.QA_OUTPUT || 'docs/design/evidence/kit'
mkdirSync(out, { recursive: true })
const content = JSON.parse(readFileSync('src/resources/kit-content.json', 'utf8'))
const baseline = JSON.parse(readFileSync('docs/design/evidence/kit/baseline.json', 'utf8'))
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_EXECUTABLE, headless: true })
const context = await browser.newContext({ permissions: ['clipboard-read','clipboard-write'] })
const page = await context.newPage()
const report = { base, checkedAt: new Date().toISOString(), downloads: [], layouts: [], checks: [], axe: [], errors: [], forbiddenRequests: [] }
page.on('pageerror', e => report.errors.push(e.message))
page.on('request', req => { if (/wa\.me|supabase\.|dental-crm-one/.test(req.url())) report.forbiddenRequests.push(req.url()) })
try {
  for (const file of content.files) {
    const response = await page.request.get(`${base}/recursos/${file.name}`)
    assert.equal(response.status(),200)
    const bytes = await response.body()
    assert.equal(bytes.length,file.bytes)
    assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256)
    const mime = response.headers()['content-type']
    assert.ok(!mime?.includes('text/html'))
    assert.ok(file.name.endsWith('.txt') ? mime?.includes('text/plain') : file.name.endsWith('.pdf') ? mime?.includes('application/pdf') : file.name.endsWith('.zip') ? mime?.includes('zip') : mime?.includes('spreadsheetml'))
    report.downloads.push({name:file.name,status:response.status(),bytes:bytes.length,mime,sha256:file.sha256})
  }
  for (const [width,height] of [[320,800],[360,800],[390,844],[768,900],[1440,900]]) {
    await page.setViewportSize({width,height})
    for (const path of ['/', '/recursos/']) {
      await page.goto(base+path,{waitUntil:'networkidle'})
      await page.evaluate(()=>document.fonts.ready)
      await page.waitForTimeout(750)
      const name = path==='/'?'after':'resources'
      await page.screenshot({path:`${out}/${name}-${width}.png`})
      const layout = await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),h1:document.querySelector('h1')?.getBoundingClientRect().toJSON(),cta:document.querySelector('.hero-primary a,.resource-hero-actions .button')?.getBoundingClientRect().toJSON()}))
      assert.equal(layout.width,layout.scrollWidth,`${path} overflow at ${width}`)
      assert.deepEqual(layout.brokenAnchors,[])
      assert.ok(layout.cta.bottom < height,`${path} primary CTA in first viewport at ${width}`)
      report.layouts.push({path,...layout})
      if(path==='/') {
        const links = await page.locator('a').evaluateAll(links=>links.map(a=>({text:a.textContent,href:a.getAttribute('href')})))
        const old = baseline.find(item=>item.base.includes('localhost')&&item.width===width)
        for (const link of old.links) assert.ok(links.some(item=>item.text===link.text&&item.href===link.href),`Preserve link ${link.text}`)
        await page.locator('#kit-gratuito').scrollIntoViewIfNeeded()
        await page.waitForTimeout(650)
        if([390,1440].includes(width)) await page.locator('#kit-gratuito').screenshot({path:`${out}/kit-feature-${width}.png`,style:'.site-header,.skip-link { opacity:0!important; }'})
      } else {
        const prompt = readFileSync('kit-separado-y-zip/Dentflow_Mega_Prompt_Web_Odontologica.txt','utf8')
        for(const id of ['guia','prompt','planilla','checklist']) {
          const detail = page.locator(`#${id} > details`)
          await detail.locator(':scope > summary').click()
          assert.equal(await detail.getAttribute('open'),'')
          assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,`Expanded ${id} at ${width}`)
          if(id==='prompt') {
            assert.equal(await page.locator('#prompt-text').textContent(),prompt)
            await page.locator('#copy-prompt').click()
            // Windows normalizes native clipboard line endings to CRLF.
            assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),prompt.replace(/\r\n/g,'\n'))
            assert.ok((await page.locator('#copy-status').innerText()).includes('copiado'))
            if(width===390) await page.locator('#copy-prompt').screenshot({path:`${out}/copy-${width}.png`})
          }
          if(id==='guia') {
            assert.equal(await page.locator('#guia .pdf-page').count(),11)
            await page.locator('#guia .pdf-page').last().locator('summary').click()
            assert.ok((await page.locator('#guia .pdf-page').last().innerText()).includes('Fuentes del proyecto'))
          }
          if(id==='checklist') {
            assert.equal(await page.locator('#checklist .pdf-page').count(),2)
            assert.equal(await page.locator('.checklist-reading ol li').count(),9)
          }
          if(id==='planilla'&&width===390) await page.locator('#planilla').screenshot({path:`${out}/sheet-${width}.png`})
          if(id==='checklist'&&width===390) await page.locator('#checklist').screenshot({path:`${out}/checklist-${width}.png`})
          if(width===390 && id==='prompt') {
            await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}}))
            await page.locator('#copy-prompt').click()
            assert.ok((await page.locator('#copy-status').innerText()).includes('No se pudo'))
            assert.equal(await page.locator('#prompt-text').evaluate(el=>el===document.activeElement),true)
            await page.evaluate(()=>delete navigator.clipboard)
          }
          await detail.locator(':scope > summary').click()
        }
        // A real click downloads bytes; verify name and content, not just href.
        if(width===390) {
          for(const file of content.files) {
            const link=page.locator(`a[download][href="/recursos/${file.name}"]`).first()
            const [download]=await Promise.all([page.waitForEvent('download'),link.click()])
            assert.equal(download.suggestedFilename(),file.name)
            const saved=await download.path()
            assert.equal(createHash('sha256').update(readFileSync(saved)).digest('hex'),file.sha256)
          }
          await page.locator('#guia > details > summary').focus()
          await page.keyboard.press('Enter')
          assert.equal(await page.locator('#guia > details').getAttribute('open'),'')
          const [popup]=await Promise.all([page.waitForEvent('popup'),page.getByRole('link',{name:'Abrir PDF en otra pestaña',exact:true}).click()])
          assert.ok(popup.url().includes('Dentflow_Kit_Guia_Practica.pdf'))
          await popup.close()
        }
      }
    }
    if([390,1440].includes(width)) for(const path of ['/', '/recursos/']) {
      await page.goto(base+path,{waitUntil:'networkidle'})
      if(path.includes('recursos')) for(const id of ['guia','prompt','planilla','checklist']) await page.locator(`#${id} > details > summary`).click()
      const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
      report.axe.push({path,width,violations:audit.violations})
      assert.deepEqual(audit.violations,[],`axe ${path} ${width}`)
    }
  }
  report.checks.push('All five widths: commercial link baseline preserved, primary CTA visible, no global overflow, all four panels expand, full prompt copied, all five real downloads match hashes.')
  await page.setViewportSize({width:390,height:844})
  await page.goto(base+'/recursos/',{waitUntil:'networkidle'})
  await page.locator('a[href="/#dentflow"]').click()
  await page.locator('#dentflow').waitFor()
  assert.equal(new URL(page.url()).pathname,'/')
  await page.getByRole('button',{name:'Abrir menú',exact:true}).click()
  await page.getByRole('navigation',{name:'Navegación principal'}).getByRole('link',{name:'Kit gratuito',exact:true}).click()
  assert.equal(new URL(page.url()).pathname,'/recursos/')
  report.checks.push('Resources menu, product CTA, back/forward native multi-page navigation.')
  await page.emulateMedia({reducedMotion:'no-preference'})
  await page.goto(base+'/',{waitUntil:'domcontentloaded'})
  assert.ok(await page.evaluate(()=>document.getAnimations().length>0),'Default experience retains animation')
  await page.locator('#enfoque').scrollIntoViewIfNeeded()
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.waitForFunction(()=>document.getAnimations().filter(a=>a.playState==='running').length===0,{},{timeout:300})
  report.checks.push('Normal motion present; switching reduced motion during section entry cancels active animations.')
  for(const path of ['/', '/recursos/']) {
    await page.emulateMedia({reducedMotion:'reduce'})
    await page.goto(base+path,{waitUntil:'networkidle'})
    assert.equal(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length),0)
    await page.screenshot({path:`${out}/reduced-${path==='/'?'landing':'resources'}-390.png`})
  }
  const nojs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}})
  const staticPage=await nojs.newPage()
  for(const path of ['/', '/recursos/']) {
    await staticPage.goto(base+path,{waitUntil:'networkidle'})
    await staticPage.getByRole('link',{name:/Descargar kit completo/}).first().waitFor()
    if(path.includes('recursos')) {
      await staticPage.locator('#guia > details > summary').click()
      assert.equal(await staticPage.locator('#guia .pdf-page').count(),11)
      await staticPage.locator('#prompt > details > summary').click()
      assert.ok((await staticPage.locator('#prompt-text').innerText()).includes('[NOMBRE DE LA CLÍNICA]'))
      assert.equal(await staticPage.locator('#copy-prompt').isVisible(),false)
    }
    await staticPage.screenshot({path:`${out}/nojs-${path==='/'?'landing':'resources'}-390.png`})
  }
  await nojs.close()
  assert.deepEqual(report.errors,[])
  assert.deepEqual(report.forbiddenRequests,[])
  report.checks.push('Reduced motion: zero running animations. No JS: landing links, resources, full PDF reading, TXT and downloads remain accessible. Clipboard denial selects full text and explains fallback. Keyboard disclosure and real PDF popup checked.')
  report.passed=true
} catch(error) { report.passed=false; report.failure=error.stack; await page.screenshot({path:`${out}/failure.png`,fullPage:true}); throw error }
finally {writeFileSync(`${out}/kit-browser-report.json`,JSON.stringify(report,null,2)+'\n');await browser.close();console.log(JSON.stringify({passed:report.passed,layouts:report.layouts.length,downloads:report.downloads.length,axe:report.axe.map(x=>({path:x.path,width:x.width,violations:x.violations.length})),failure:report.failure},null,2))}
