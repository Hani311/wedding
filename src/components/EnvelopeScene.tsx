import { lazy, Suspense, useRef, type ReactNode } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { t } from '../i18n/content'

// Code-split the Lottie hero (lottie-web is the heaviest dep) out of the entry
// bundle so the page shell + greeting paint first, then the envelope hydrates.
const LottieEnvelope = lazy(() => import('./LottieEnvelope'))

/**
 * Sticky scrollytelling sequence — section is 190vh.
 *
 * The hero is the Lottie envelope animation, scrubbed by scroll. The Lottie
 * pops its flap open in its first ~15% of frames then slowly creeps the
 * letter out over the rest, so a linear scrub feels like "flap snaps, then a
 * long boring wait before the text". We fix that with an easing exponent on
 * LottieEnvelope (ease=1.8): the flap opens at a graceful pace, the letter
 * then slides out briskly, and everything finishes by progress 0.70 — so the
 * greeting starts writing on at ~0.6 viewport of scroll instead of making you
 * scroll most of the page for it. 0.70–1.0 is a hold so the finished
 * invitation sits on screen before the date section scrolls in.
 */
/**
 * The greeting, pre-broken into balanced calligraphy lines that fit the
 * letter's writing area. Each word is assigned its own slice of scroll
 * progress (0.70 → ~0.80) so the phrase writes on one word at a time. The
 * last line (the names) is rendered a little larger as the focal point.
 */
const GREETING_LINES = (() => {
  const STEP = 0.0055
  const DUR = 0.04
  let i = 0
  return t.greeting.lines.map((line) => ({
    size: line.accent ? t.greeting.accentSize : t.greeting.baseSize,
    accent: line.accent ?? false,
    words: line.words.map((w) => {
      const from = 0.7 + i++ * STEP
      return { w, from, to: from + DUR }
    }),
  }))
})()

export default function EnvelopeScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Smooth scrub for the frame-by-frame Lottie — gentle, no jitter.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 38,
    mass: 0.4,
  })

  const hintOpacity = useTransform(smooth, [0.0, 0.06], [1, 0])
  // Gentle "leaning in" — completes when the envelope does (0.70).
  const stageScale = useTransform(smooth, [0.0, 0.7], [1, 1.04])

  return (
    <section ref={sectionRef} className="relative h-[190vh]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: stageScale }}
          className="relative flex items-center justify-center"
        >
          {/* Lottie comp is 1440x1024 — keep that ratio so nothing is
              letterboxed or cropped. containerType lets the text overlay
              size itself in cqw units so it tracks the envelope exactly on
              every screen. */}
          <div
            className="relative"
            style={{
              // Floor kept low so the hero isn't clipped on phones narrower
              // than the floor (e.g. 360–390px, where 95vmin < the floor).
              width: 'clamp(320px, 95vmin, 1040px)',
              aspectRatio: '1440 / 1024',
              containerType: 'inline-size',
            }}
          >
            <Suspense
              fallback={
                <div
                  className="h-full w-full"
                  style={{ aspectRatio: '1440 / 1024' }}
                  aria-hidden
                />
              }
            >
              <LottieEnvelope
                scrollProgress={smooth}
                start={0}
                end={0.7}
                ease={1.8}
                className="h-full w-full"
              />
            </Suspense>

            {/* Live calligraphy greeting, revealed word-by-word once the
                letter has settled. Positioned over the letter's writing
                area; sizes in cqw so it scales with the envelope. */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* The greeting is the page's one true heading — mark it as the
                  <h1> (Tailwind preflight resets h1 size/weight to inherit, so
                  this is purely semantic, no visual change). Each line is a
                  block span so the words still cascade in word-by-word. */}
              <h1
                className="absolute left-1/2 top-[20%] m-0 -translate-x-1/2 text-center font-normal"
                style={{ color: 'rgba(38, 32, 26, 0.95)' }}
              >
                {GREETING_LINES.map((line, li) => (
                  <span
                    key={li}
                    className={`greeting-line font-script block whitespace-nowrap leading-[1.5] ${
                      line.accent ? 'mt-[0.3em]' : ''
                    }`}
                    style={{ fontSize: line.size }}
                  >
                    {line.words.flatMap((word, wi) => [
                      <RevealWord
                        key={wi}
                        progress={smooth}
                        from={word.from}
                        to={word.to}
                      >
                        {word.w}
                      </RevealWord>,
                      ' ',
                    ])}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--color-ink-muted)]">
            {t.scrollToOpen}
          </p>
          <div className="scroll-hint mx-auto mt-3 h-10 w-px bg-gradient-to-b from-[color:var(--color-ink-muted)]/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}

/**
 * One word of the greeting. Fades + rises into place over its own slice of
 * scroll progress, so a sequence of these reads as a staggered reveal.
 * Honours prefers-reduced-motion by rendering statically.
 */
function RevealWord({
  progress,
  from,
  to,
  children,
}: {
  progress: MotionValue<number>
  from: number
  to: number
  children: ReactNode
}) {
  const reduced = useReducedMotion()
  const opacity = useTransform(progress, [from, to], [0, 1])
  const y = useTransform(progress, [from, to], ['0.5em', '0em'])
  if (reduced) {
    return <span className="inline-block">{children}</span>
  }
  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {children}
    </motion.span>
  )
}
