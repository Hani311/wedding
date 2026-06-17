import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { t } from '../i18n/content'

// Lives in public/ so it ships as a static asset; BASE_URL keeps the path
// correct under the GitHub Pages subfolder (/wedding/en/, /wedding/ar/).
const SRC = `${import.meta.env.BASE_URL}i-think-they-call-this-love.mp3`

/**
 * Background music + the "tap to open" entry gate.
 *
 * Phones only unlock audio on a real tap/click — never on scroll or page load.
 * So we front the invite with a one-tap intro: that single tap both starts the
 * music AND reveals the site, which guarantees the unlock. After entry, a small
 * floating button mutes/unmutes.
 */
export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [opened, setOpened] = useState(false)
  const [playing, setPlaying] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.45
  }, [])

  // Lock page scroll behind the intro so the only thing to do is tap.
  useEffect(() => {
    if (opened) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [opened])

  // play() must run synchronously inside the tap for mobile to allow audio.
  const open = () => {
    audioRef.current?.play().catch(() => {})
    setOpened(true)
  }

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

      <AnimatePresence>
        {!opened && (
          <motion.button
            key="intro"
            type="button"
            onClick={open}
            aria-label={t.tapToOpen}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center gap-7 px-6 text-center"
            style={{
              background:
                'radial-gradient(circle at 50% 38%, #fffdf8 0%, #f5efe2 72%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 0.9, 0.3, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[11px] rtl:text-[13px] uppercase tracking-[0.5em] text-[color:var(--color-gold-text)]">
                {t.invitationLabel}
              </span>
              <span className="font-script text-5xl text-[color:var(--color-gold-deep)] md:text-6xl">
                {t.names.combined}
              </span>
            </motion.div>
            <motion.span
              animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.45em] text-[color:var(--color-gold-text)]"
            >
              <NoteIcon className="h-3.5 w-3.5" />
              {t.tapToOpen}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      {opened && (
        <motion.button
          type="button"
          onClick={toggle}
          aria-label={playing ? t.music.pause : t.music.play}
          aria-pressed={playing}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="fixed bottom-4 end-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-gold-deep)]/30 bg-[color:var(--color-cream)]/70 text-[color:var(--color-gold-deep)] shadow-md backdrop-blur transition hover:bg-[color:var(--color-cream)] hover:text-[color:var(--color-gold-text)]"
        >
          <NoteIcon className="h-[18px] w-[18px]" muted={!playing} />
        </motion.button>
      )}
    </>
  )
}

function NoteIcon({
  muted = false,
  className = 'h-[18px] w-[18px]',
}: {
  muted?: boolean
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
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
      {muted && <path d="M3 3 L21 21" />}
    </svg>
  )
}
