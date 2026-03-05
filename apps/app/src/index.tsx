/* @refresh reload */
import './index.css'

import { render } from 'solid-js/web'
import App from './App'

// ── Rabbit R1 device controls ──────────────────────────────────────────────
// The R1's scroll wheel dispatches custom DOM events instead of wheel events.
// Wire them up to smooth-scroll the currently focused scrollable container.
const SCROLL_STEP = 60 // px per tick

function getScrollTarget(): Element {
  // Walk up from the active element to find the nearest scrollable ancestor
  let el: Element | null = document.activeElement
  while (el && el !== document.documentElement) {
    const style = getComputedStyle(el)
    const overflowY = style.overflowY
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight) {
      return el
    }
    el = el.parentElement
  }
  // Fall back to the page body / root
  return document.scrollingElement || document.documentElement
}

window.addEventListener('scrollUp', () => {
  getScrollTarget().scrollBy({ top: -SCROLL_STEP, behavior: 'smooth' })
})

window.addEventListener('scrollDown', () => {
  getScrollTarget().scrollBy({ top: SCROLL_STEP, behavior: 'smooth' })
})

// sideClick acts as a "back / escape" on the R1
window.addEventListener('sideClick', () => {
  if (window.history.length > 1) {
    window.history.back()
  }
})
// ──────────────────────────────────────────────────────────────────────────

const root = document.getElementById('root')

if (!root) throw new Error('No #root element found in the DOM.')

render(() => <App />, root)
