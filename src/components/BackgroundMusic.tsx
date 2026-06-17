import { useEffect, useRef, useState } from 'react'
import { t } from '../i18n/content'

// Lives in public/ so it ships as a static asset; BASE_URL keeps the path
// correct under the GitHub Pages subfolder (/wedding/en/, /wedding/ar/).
const SRC = `${import.meta.env.BASE_URL}i-think-they-call-this-love.mp3`

/**
 * Background music with a floating mute/unmute control.
 *
 * Browsers block sound-on-load (especially mobile), so we can't truly autoplay.
 * Instead we start on the guest's FIRST interaction — their first tap or scroll,
 * which is also how they open the envelope — so it feels automatic. The button
 * lets them silence it at any time.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.45

    // Only a COMPLETED activation gesture unlocks audio — a tap-release, click,
    // or keypress. pointerdown/touchstart/scroll do NOT count, so we listen for
    // touchend (fires when the finger lifts after scrolling the envelope open),
    // pointerup, click and keydown. The first one starts the music — no button.
    const events = ['touchend', 'pointerup', 'click', 'keydown'] as const
    const start = () => {
      // play() must be called synchronously inside the gesture for mobile to
      // allow it; the .then only runs cleanup once it actually started.
      audio.play().then(
        () => events.forEach((e) => window.removeEventListener(e, start)),
        () => {}, // still blocked — wait for the next gesture
      )
    }

    start() // desktop / already-permitted starts now; mobile waits for a gesture
    events.forEach((e) => window.addEventListener(e, start, { passive: true }))
    return () => events.forEach((e) => window.removeEventListener(e, start))
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().catch(() => {})
    else audio.pause()
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={SRC}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t.music.pause : t.music.play}
        aria-pressed={playing}
        className="fixed bottom-4 end-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-gold-deep)]/30 bg-[color:var(--color-cream)]/70 text-[color:var(--color-gold-deep)] shadow-md backdrop-blur transition hover:bg-[color:var(--color-cream)] hover:text-[color:var(--color-gold-text)]"
      >
        <MusicIcon playing={playing} />
      </button>
    </>
  )
}

function MusicIcon({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* beamed eighth-notes */}
      <path d="M9 18V6l10-2v10" />
      <circle cx="6.5" cy="18" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="16" r="2.5" fill="currentColor" stroke="none" />
      {/* muted: diagonal slash */}
      {!playing && <path d="M3 3 L21 21" />}
    </svg>
  )
}
