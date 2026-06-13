import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { t } from './i18n/content'

// Apply the active language's lang/dir to <html>. The per-language production
// build also bakes these statically into index.html (for scrapers + no FOUC),
// but setting them here keeps `npm run dev` / `dev:ar` correct too.
document.documentElement.lang = t.htmlLang
document.documentElement.dir = t.dir

// Always start at the top on refresh — the envelope opening IS the page, so
// restoring a mid-scroll position would dump visitors into a half-played
// animation. 'instant' bypasses the html { scroll-behavior: smooth } rule.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
