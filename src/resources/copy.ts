import { initScrollReveals } from '../scrollReveals'

initScrollReveals([
  '.kit-index', '.resource-routes > article', '.library-heading', '.resource-card',
  '.resource-faq > div:first-child', '.resource-faq > div:last-child > details',
  '.resource-contact > .shell', '.footer-main', '.footer-bottom',
].join(', '))

const button = document.querySelector<HTMLButtonElement>('#copy-prompt')
const text = document.querySelector<HTMLElement>('#prompt-text')
const status = document.querySelector<HTMLElement>('#copy-status')

button?.addEventListener('click', async () => {
  if (!text || !status) return
  try {
    await navigator.clipboard.writeText(text.textContent ?? '')
    status.textContent = 'Prompt completo copiado. Pegalo y personalizá los campos entre corchetes.'
  } catch {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(text)
    selection?.removeAllRanges()
    selection?.addRange(range)
    text.focus()
    status.textContent = 'No se pudo copiar automáticamente. El texto está seleccionado: usá Copiar o descargá el TXT.'
  }
})

// A fragment link can point directly to a closed reading panel.
function revealFragment() {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  const panel = target?.closest('details')
  if (panel instanceof HTMLDetailsElement) panel.open = true
}
window.addEventListener('hashchange', revealFragment)
revealFragment()
