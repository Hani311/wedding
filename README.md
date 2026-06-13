# Wedding Invitation — Hani & Roaa

A single-page wedding invitation site: a scroll-driven Lottie envelope that
opens to reveal the greeting, followed by date, venue (with map link + add-to-
calendar), and an RSVP form that posts to a Discord webhook. Phone-first.

Stack: Vite + React + TypeScript + Tailwind v4 + framer-motion + lottie-react.

## Develop

```bash
npm install
npm run dev      # http://localhost:5180
```

## RSVP webhook

The RSVP form reads `VITE_DISCORD_WEBHOOK_URL`. Copy `.env.example` to
`.env.local` and paste your Discord webhook URL there (see `.env.example` for
how to create one and the note that the URL is bundled into client JS). Without
it, the form shows a "not connected" message.

## Build & deploy (GitHub Pages)

```bash
npm run build    # outputs static site to dist/ (also writes dist/.nojekyll)
npm run preview  # serve the production build locally
```

`vite.config.ts` uses `base: './'` (relative asset paths), so the build works
unchanged whether it's served from a project subpath (`user.github.io/repo/`),
a user/org root page, or a custom domain. Two things to finalize at deploy:

- **OG tags**: set the absolute `og:image` / `og:url` in `index.html` to the
  real Pages URL so chat-app link previews show the image.
- **Webhook**: provide `VITE_DISCORD_WEBHOOK_URL` at build time (e.g. a GitHub
  Actions secret) and rebuild.

`lottie-backups/` (uncompressed source Lotties) and `scripts/compress-lottie.mjs`
are dev-only tooling, gitignored / not shipped.
