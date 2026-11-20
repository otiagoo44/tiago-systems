import { createRequire } from 'node:module'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.QA_URL
assert.ok(base?.startsWith('https://'), 'QA_URL must name the preview deployment')
const out = 'docs/design/evidence/kit/preview'
mkdirSync(out,{recursive:true})
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE})
const context = await browser.newContext({permissions:['clipboard-read','clipboard-write']})
const page = await context.newPage()
const report = {base,checkedAt:new Date().toISOString(),downloads:[],screens:[],errors:[]}
page.on('pageerror',error=>report.errors.push(error.message))
try {
  // Use Vercel's scoped, expiring share cookie; never change protection settings.
  if(process.env.QA_SHARE_URL) await page.goto(process.env.QA_SHARE_URL,{waitUntil:'networkidle'})
  const files = JSON.parse(readFileSync('src/resources/kit-content.json','utf8')).files
  for(const file of files) {
    const response = await page.request.get(`${base}/recursos/${file.name}`)
    assert.equal(response.status(),200,file.name)
    const body = await response.body()
    assert.equal(createHash('sha256').update(body).digest('hex'),file.sha256)
    assert.ok(response.headers()['content-type'] && !response.headers()['content-type'].includes('html'))
    report.downloads.push({name:file.name,status:response.status(),bytes:body.length,mime:response.headers()['content-type']})
  }
  for(const [width,height] of [[390,844],[1440,900]]) {
    await page.setViewportSize({width,height})
    for(const path of ['/','/recursos/']) {
      await page.goto(base+path,{waitUntil:'networkidle'})
      await page.evaluate(()=>document.fonts.ready)
      await page.waitForTimeout(750)
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width)
      await page.screenshot({path:`${out}/${path==='/'?'landing':'resources'}-${width}.png`})
      report.screens.push({path,width,title:await page.title()})
    }
  }
  await page.locator('#prompt > details > summary').click()
  await page.locator('#copy-prompt').click()
  assert.equal((await page.evaluate(()=>navigator.clipboard.readText())).replace(/\r\n/g,'\n'),readFileSync('kit-separado-y-zip/Dentflow_Mega_Prompt_Web_Odontologica.txt','utf8').replace(/\r\n/g,'\n'))
  const [download] = await Promise.all([page.waitForEvent('download'),page.locator('.resource-hero-actions a[download]').click()])
  assert.equal(download.suggestedFilename(),'Dentflow_Kit_Gratuito_Publico.zip')
  await page.getByRole('link',{name:'Conocer DentFlow',exact:true}).click()
  await page.locator('.hero-primary a').waitFor()
  assert.equal(new URL(page.url()).hash,'#dentflow')
  assert.equal(await page.locator('a[href^="https://wa.me/"]').count(),5)
  assert.deepEqual(report.errors,[])
  report.passed=true
} catch(error) { report.passed=false; report.failure=error.message; throw error }
finally {writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2)+'\n'); await browser.close();console.log(JSON.stringify(report,null,2))}
