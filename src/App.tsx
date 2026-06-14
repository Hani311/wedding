import { useState } from 'react'
import AddToCalendar from './components/AddToCalendar'
import AnimatedDivider from './components/AnimatedDivider'
import AnimatedText from './components/AnimatedText'
import EnvelopeScene from './components/EnvelopeScene'
import FallingPetals from './components/FallingPetals'
import FloralBackground from './components/FloralBackground'
import RevealSection from './components/RevealSection'
import RsvpModal from './components/RsvpModal'
import SectionDivider from './components/SectionDivider'
import Sparkles from './components/Sparkles'
import { t } from './i18n/content'

export default function App() {
  const [rsvpOpen, setRsvpOpen] = useState(false)
  return (
    <main className="relative">
      <FloralBackground />
      <Sparkles />
      <FallingPetals />

      <EnvelopeScene />

      <SectionDivider />

      {/* Date */}
      <section className="relative flex min-h-[60vh] items-center justify-center px-6 py-16 md:py-24">
        <RevealSection className="max-w-xl text-center">
          <p className="eyebrow">{t.date.eyebrow}</p>
          <h2 className="font-display mt-6 text-4xl tracking-tight text-[color:var(--color-ink)] md:text-6xl">
            <AnimatedText text={t.date.day} stagger={0.05} />
          </h2>
          {/* Side dividers are desktop-only — on a phone they squeeze the
              script date into an ugly two-line wrap. */}
          <div className="mx-auto my-6 flex items-center justify-center gap-6">
            <AnimatedDivider
              origin="right"
              className="hidden h-px w-20 bg-[color:var(--color-gold-deep)]/50 md:block"
              delay={0.2}
            />
            <span className="font-script text-3xl text-[color:var(--color-gold-deep)] md:text-4xl">
              <AnimatedText
                text={t.date.full}
                stagger={0.03}
                initialDelay={0.4}
              />
            </span>
            <AnimatedDivider
              origin="left"
              className="hidden h-px w-20 bg-[color:var(--color-gold-deep)]/50 md:block"
              delay={0.2}
            />
          </div>
          <p className="font-display text-lg italic text-[color:var(--color-ink-muted)] md:text-xl">
            {t.date.time}
          </p>
          <div className="mt-10 flex justify-center">
            <AddToCalendar />
          </div>
        </RevealSection>
      </section>

      <SectionDivider />

      {/* Venue */}
      <section className="relative flex min-h-[60vh] items-center justify-center px-6 py-16 md:py-24">
        <RevealSection className="max-w-2xl text-center">
          <p className="eyebrow">{t.venue.eyebrow}</p>
          <a
            href={t.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t.venue.viewOnMap} — ${t.venue.name}`}
            className="group mt-6 inline-block"
          >
            <h2 className="font-display text-5xl tracking-tight text-[color:var(--color-ink)] transition-colors group-hover:text-[color:var(--color-gold-deep)] md:text-7xl">
              <AnimatedText text={t.venue.name} stagger={0.05} />
            </h2>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-base text-[color:var(--color-ink-muted)] underline-offset-4 transition group-hover:text-[color:var(--color-ink)] group-hover:underline md:text-lg">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 flex-shrink-0 text-[color:var(--color-gold-deep)] md:h-[18px] md:w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{t.venue.address}</span>
            </p>
            <span className="mt-4 flex items-center justify-center gap-1.5 text-[10px] rtl:text-[13px] uppercase tracking-[0.4em] text-[color:var(--color-gold-text)] transition group-hover:text-[color:var(--color-gold-deep)]">
              {t.venue.viewOnMap}
              <svg
                viewBox="0 0 12 12"
                className="h-2.5 w-2.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path
                  d="M3 9 L9 3 M5 3 H9 V7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <div className="mx-auto mt-10 flex justify-center">
            <AnimatedDivider
              origin="center"
              className="h-px w-24 bg-[color:var(--color-gold-deep)]/50"
            />
          </div>
          <p className="font-display mt-10 text-base italic text-[color:var(--color-ink-muted)] md:text-lg">
            {t.venue.closing}
          </p>
        </RevealSection>
      </section>

      <SectionDivider />

      {/* RSVP / closing */}
      <section className="relative flex min-h-[55vh] items-center justify-center px-6 py-16 md:py-24">
        <RevealSection className="max-w-md text-center">
          <p className="eyebrow">{t.rsvp.eyebrow}</p>
          <h2 className="font-display mt-6 text-3xl tracking-tight text-[color:var(--color-ink)] md:text-4xl">
            <AnimatedText text={t.rsvp.byHeading} stagger={0.025} />
          </h2>
          <p className="mt-4 font-display text-base italic text-[color:var(--color-ink-muted)] md:text-lg">
            {t.rsvp.subline}
          </p>
          <button
            type="button"
            onClick={() => setRsvpOpen(true)}
            className="mt-10 inline-block border border-[color:var(--color-gold-deep)]/60 px-10 py-3.5 text-[11px] uppercase tracking-[0.5em] text-[color:var(--color-ink)] transition hover:border-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold-deep)] hover:text-white"
          >
            {t.rsvp.replyButton}
          </button>
        </RevealSection>
      </section>

      <footer className="relative px-6 pb-14 pt-6 text-center">
        <div className="mx-auto mb-6 flex items-center justify-center gap-4">
          <span className="block h-px w-10 bg-[color:var(--color-gold-deep)]/30" />
          <span className="font-display text-[10px] uppercase tracking-[0.5em] text-[color:var(--color-gold-text)]">
            {t.footer.withLove}
          </span>
          <span className="block h-px w-10 bg-[color:var(--color-gold-deep)]/30" />
        </div>
        <p className="font-script text-3xl text-[color:var(--color-gold-deep)] md:text-4xl">
          {t.names.combined}
        </p>
      </footer>

      <RsvpModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} />
    </main>
  )
}
