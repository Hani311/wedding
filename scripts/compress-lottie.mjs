// One-off dev tool: shrink the embedded PNGs inside the envelope Lottie by
// re-encoding them as resized WebP (alpha preserved). Reads the uncompressed
// backup (lottie-backups/, gitignored) so it can be re-run idempotently;
// writes public/envelope.json.
//
// Requires `sharp` (NOT a project dependency — install on demand):
//   npm i --no-save sharp
// Run:  node scripts/compress-lottie.mjs [maxDim] [quality]
import { readFileSync, writeFileSync, statSync } from 'node:fs'
import sharp from 'sharp'

const MAX_DIM = Number(process.argv[2] ?? 1600)
const QUALITY = Number(process.argv[3] ?? 82)
const SRC = 'lottie-backups/envelope-uncompressed.json'
const OUT = 'public/envelope.json'

const j = JSON.parse(readFileSync(SRC, 'utf8'))
let before = 0
let after = 0

for (const a of j.assets ?? []) {
  const p = a.p ?? ''
  const m = /^data:image\/[^;]+;base64,(.*)$/.exec(p)
  if (!m) continue
  const raw = Buffer.from(m[1], 'base64')
  before += raw.length
  const webp = await sharp(raw)
    .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer()
  after += webp.length
  a.p = 'data:image/webp;base64,' + webp.toString('base64')
  console.log(
    `asset ${a.id}: ${(raw.length / 1024) | 0} KB -> ${(webp.length / 1024) | 0} KB`,
  )
}

writeFileSync(OUT, JSON.stringify(j))
console.log(
  `\nembedded images: ${(before / 1e6).toFixed(2)} MB -> ${(after / 1e6).toFixed(2)} MB`,
)
console.log(
  `envelope.json: ${(statSync(SRC).size / 1e6).toFixed(2)} MB -> ${(statSync(OUT).size / 1e6).toFixed(2)} MB`,
)
