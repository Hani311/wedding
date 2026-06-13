// Runs after both language builds. Writes the files that live at the site
// root (above the /en and /ar folders): a redirect to the default language,
// .nojekyll, and robots.txt.
import { writeFileSync } from 'node:fs'

const DEFAULT_LANG = 'en'

// Root → default language. Meta-refresh for no-JS scrapers; JS replace (with
// hash preserved) for everyone else. relative ./<lang>/ keeps it portable.
writeFileSync(
  'dist/index.html',
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <meta http-equiv="refresh" content="0; url=./${DEFAULT_LANG}/" />
    <link rel="canonical" href="./${DEFAULT_LANG}/" />
    <title>Hani & Roaa</title>
    <script>
      location.replace('./${DEFAULT_LANG}/' + location.search + location.hash)
    </script>
  </head>
  <body>
    <a href="./${DEFAULT_LANG}/">Continue to the invitation →</a>
  </body>
</html>
`,
)

// GitHub Pages runs Jekyll, which strips _-prefixed paths. Opt out.
writeFileSync('dist/.nojekyll', '')

// Robots at the publish root (belt-and-suspenders alongside the per-page
// noindex meta).
writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n')

console.log('postbuild: wrote dist/index.html redirect, .nojekyll, robots.txt')
