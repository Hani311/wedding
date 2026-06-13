import LottieImport from 'lottie-react'
import type { LottieRefCurrentProps } from 'lottie-react'
import { useEffect, useRef, useState } from 'react'
import {
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'

/**
 * lottie-react ships without a "exports" field in package.json. Newer Vite
 * (rolldown-based) hands us the CJS namespace object instead of unwrapping
 * the default export, so `<Lottie ...>` errors with "got object". Normalise
 * here so we always end up with the actual component function.
 */
type LottieComponent = typeof LottieImport
const Lottie: LottieComponent =
  (LottieImport as unknown as { default?: LottieComponent }).default ??
  LottieImport

type Props = {
  /** Scroll progress motion value for the parent section (0 to 1). */
  scrollProgress: MotionValue<number>
  /** Scroll point at which the envelope animation starts (default 0). */
  start?: number
  /** Scroll point at which the envelope animation finishes (default 0.3). */
  end?: number
  /**
   * Easing exponent applied to the scroll→frame mapping (frame = t^ease).
   * This Lottie pops the flap open in its first ~15% of frames then spends
   * the rest slowly sliding the letter out. A linear scrub therefore feels
   * like "flap snaps, then a long boring creep". ease > 1 front-loads scroll
   * onto the early frames — the flap opens gracefully slowly and the letter
   * then slides out briskly. 1 = linear.
   */
  ease?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * Wedding-envelope Lottie animation, scrubbed by scroll position. The JSON
 * lives in `public/envelope.json` (~400KB with embedded WebP images) so it's
 * fetched as a static asset rather than bundled into the JS chunk. The path
 * is built from import.meta.env.BASE_URL so it resolves under a GitHub Pages
 * subpath as well as at the domain root.
 *
 * Playback: when the parent section's scroll progress is between `start` and
 * `end`, we map that to the animation's frame range and freeze every change
 * to a specific frame. So scrolling the page literally drives the envelope
 * opening — pause, scroll back, scrub forward, all just works.
 *
 * prefers-reduced-motion: we jump straight to the final (fully-open) frame and
 * ignore scroll, so reduced-motion guests see the opened letter immediately
 * (matching the always-visible greeting overlay) instead of a sealed envelope.
 */
export default function LottieEnvelope({
  scrollProgress,
  start = 0,
  end = 0.3,
  ease = 1,
  className = '',
  style,
}: Props) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const [data, setData] = useState<object | null>(null)
  const reduced = useReducedMotion()

  // Fetch the JSON once. Cached by the browser after the first request.
  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}envelope.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch((err) => {
        console.error('Failed to load envelope Lottie:', err)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Reduced-motion: once the data is in and the lottie instance exists, jump to
  // the last frame (fully open) so the letter is presented without animation.
  useEffect(() => {
    if (!reduced || !data) return
    const lottie = lottieRef.current
    const total = lottie?.getDuration(true) ?? 0
    if (lottie && total > 0) lottie.goToAndStop(total - 1, true)
  }, [reduced, data])

  // Keep the Lottie frame in sync with scroll position. We use
  // useMotionValueEvent so we don't subscribe React's render cycle to every
  // scroll tick — we just imperatively call goToAndStop on the lottie ref.
  useMotionValueEvent(scrollProgress, 'change', (v) => {
    const lottie = lottieRef.current
    if (!lottie || !data) return
    const total = lottie.getDuration(true) ?? 0
    if (total <= 0) return
    const range = end - start
    const t = range === 0 ? 0 : Math.max(0, Math.min((v - start) / range, 1))
    // Reduced-motion: hold the final (open) frame regardless of scroll.
    // Otherwise front-load scroll onto early frames so the flap isn't a snap.
    const eased = reduced ? 1 : ease === 1 ? t : Math.pow(t, ease)
    // total - 1 because frames are 0-indexed
    lottie.goToAndStop(eased * (total - 1), true)
  })

  if (!data) {
    // Placeholder while the ~400KB JSON loads. Same dimensions as the
    // animation will be so layout doesn't jump.
    return (
      <div
        className={className}
        style={{ aspectRatio: '1 / 1', ...style }}
        aria-hidden
      />
    )
  }

  // The envelope is decorative; the invitation content is the greeting overlay
  // and the sections below. aria-hidden keeps the Lottie SVG out of the a11y
  // tree so screen readers don't announce stray graphic nodes.
  return (
    <div className={className} style={style} aria-hidden>
      <Lottie
        lottieRef={lottieRef}
        animationData={data}
        autoplay={false}
        loop={false}
        className="h-full w-full"
      />
    </div>
  )
}
