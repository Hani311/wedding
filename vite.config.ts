import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { en, ar } from './src/i18n/content'

// The deployed GitHub Pages address. Used only for the absolute OG/Twitter
// preview URLs (chat-app scrapers require absolute URLs). Change this if the
// repo is renamed or a custom domain is added.
const SITE = 'https://hani311.github.io/wedding'

// Active language for this build/dev run (VITE_LANG=ar for the Arabic build).
const LANG: 'en' | 'ar' = process.env.VITE_LANG === 'ar' ? 'ar' : 'en'
const C = LANG === 'ar' ? ar : en

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Fill the per-language placeholders in index.html (title, meta, OG, lang/dir,
// Arabic font). Runs in dev too, so `npm run dev:ar` is a faithful preview.
function localeHtml(): Plugin {
  const amiri =
    LANG === 'ar'
      ? '<link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />'
      : ''
  const ogImage = `${SITE}/${LANG}/og-image${LANG === 'ar' ? '-ar' : ''}.jpg`
  const repl: Record<string, string> = {
    '%HTML_LANG%': C.htmlLang,
    '%HTML_DIR%': C.dir,
    '%APP_TITLE%': esc(C.metaTitle),
    '%APP_DESC%': esc(C.metaDescription),
    '%OG_DESC%': esc(C.ogDescription),
    '%OG_IMAGE%': ogImage,
    '%OG_URL%': `${SITE}/${LANG}/`,
    '%OG_LOCALE%': LANG === 'ar' ? 'ar_AR' : 'en_US',
    '<!--%ARABIC_FONT%-->': amiri,
  }
  return {
    name: 'wedding-locale-html',
    transformIndexHtml(html) {
      return Object.entries(repl).reduce(
        (out, [k, v]) => out.split(k).join(v),
        html,
      )
    },
  }
}

export default defineConfig({
  // Relative base so built asset URLs resolve under each language subfolder
  // (/<repo>/en/, /<repo>/ar/) without hardcoding the repo name.
  base: './',
  plugins: [react(), tailwindcss(), localeHtml()],
  build: {
    // Each language builds into its own self-contained folder.
    outDir: `dist/${LANG}`,
    emptyOutDir: true,
  },
  server: {
    port: 5180,
    strictPort: true,
  },
})
