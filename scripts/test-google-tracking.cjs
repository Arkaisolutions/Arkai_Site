const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

function scenario(choice) {
  const scripts = [], events = {}, timers = []
  const window = {
    location: { href: 'https://example.test/', pathname: '/' },
    localStorage: { getItem: () => choice },
    setTimeout: (fn) => { timers.push(fn); return timers.length },
    clearTimeout: () => {},
  }
  class Element {}
  class HTMLAnchorElement extends Element {}
  const document = {
    createElement: () => ({}), head: { appendChild: (s) => scripts.push(s) },
    addEventListener: (name, fn) => { events[name] = fn },
  }
  const cache = {}
  function load(name) {
    if (cache[name]) return cache[name]
    if (name === '../config') return { config: { googleTagManagerId: 'GTM-5SNX33LF' } }
    const exports = {}
    cache[name] = exports
    const source = fs.readFileSync(`src/lib/${name.replace('./', '')}.ts`, 'utf8')
    const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText
    vm.runInNewContext(code, { exports, require: load, window, document, Element, HTMLAnchorElement, URL, Date })
    return exports
  }
  const gtm = load('./googleTagManager'), track = load('./track')
  gtm.initGoogleTagManager(); gtm.initGoogleTagManager()
  gtm.initWhatsAppTracking(); gtm.initWhatsAppTracking()
  const link = new HTMLAnchorElement()
  link.href = 'https://wa.me/123?text=private-message'
  link.closest = () => link
  events.click({ target: link })
  return { scripts, window, timers, events, link, track }
}

async function run() {
  for (const choice of [null, 'rejected']) {
    const s = scenario(choice)
    await s.track.trackLeadSubmit({ origin: 'page' })
    assert.equal(s.scripts.length, 0)
    assert.equal(s.window.dataLayer, undefined)
  }
  const s = scenario('accepted')
  assert.equal(s.scripts.length, 1)
  assert.match(s.scripts[0].src, /GTM-5SNX33LF$/)
  const click = s.window.dataLayer.find(e => e.event === 'whatsapp_click')
  assert.equal(click.after_form, false)
  assert.ok(!JSON.stringify(click).includes('private-message'))
  s.window.location.pathname = '/diagnostico/obrigado'
  s.events.click({ target: s.link })
  assert.equal(s.window.dataLayer.at(-1).after_form, true)
  let completed = false
  const pending = s.track.trackLeadSubmit({ origin: 'page' }).then(() => { completed = true })
  await Promise.resolve()
  assert.equal(completed, false)
  s.window.dataLayer.at(-1).eventCallback()
  await pending
  assert.equal(completed, true)
  const fallback = s.track.trackLeadSubmit({ origin: 'page' })
  s.timers.at(-1)()
  await fallback
  console.log('OK: consentimento, carga única, WhatsApp sem mensagem, pós-formulário e callback/timeout do lead.')
}
run().catch(error => { console.error(error); process.exitCode = 1 })
