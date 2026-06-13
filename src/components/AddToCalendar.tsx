import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { t } from '../i18n/content'
import { event } from '../data/event'

const LOCATION = `${t.venue.name}, ${t.venue.address}`

/**
 * "Add to calendar" widget — single button that reveals a small dropdown
 * with three targets: Google Calendar (web link), Apple Calendar (.ics
 * download — iOS/macOS imports straight into Calendar.app), and Outlook
 * (web link). Click-outside and Esc both dismiss the menu.
 *
 * Text comes from the i18n layer (t.calendar / t.addToCalendar); the date/time
 * facts come from the language-neutral `event` module.
 */
export default function AddToCalendar() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2.5 rounded-full border border-[color:var(--color-gold-deep)]/40 bg-white/40 px-6 py-3 text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-ink)] backdrop-blur-sm transition hover:border-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold-deep)] hover:text-white"
      >
        <CalendarIcon className="h-3.5 w-3.5" />
        {t.addToCalendar.label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 0.9, 0.3, 1] }}
            style={{ transformOrigin: 'top center' }}
            className="absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2 overflow-hidden rounded-lg border border-[color:var(--color-ink-muted)]/15 bg-white shadow-[0_18px_40px_-12px_rgba(54,50,42,0.35)]"
          >
            <CalendarOption
              label={t.addToCalendar.google}
              href={googleCalendarUrl()}
              external
              onSelect={() => setOpen(false)}
            />
            <CalendarOption
              label={t.addToCalendar.apple}
              onSelect={() => {
                downloadIcs()
                setOpen(false)
              }}
            />
            <CalendarOption
              label={t.addToCalendar.outlook}
              href={outlookCalendarUrl()}
              external
              onSelect={() => setOpen(false)}
              last
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CalendarOption({
  label,
  href,
  external,
  onSelect,
  last,
}: {
  label: string
  href?: string
  external?: boolean
  onSelect: () => void
  last?: boolean
}) {
  const cls = `flex w-full items-center justify-between gap-3 px-5 py-3.5 text-start font-display text-[15px] italic text-[color:var(--color-ink)] transition hover:bg-[color:var(--color-page-2)] ${
    last ? '' : 'border-b border-[color:var(--color-ink-muted)]/10'
  }`
  if (href) {
    return (
      <a
        role="menuitem"
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onSelect}
        className={cls}
      >
        <span>{label}</span>
        <ArrowIcon />
      </a>
    )
  }
  return (
    <button role="menuitem" type="button" onClick={onSelect} className={cls}>
      <span>{label}</span>
      <DownloadIcon />
    </button>
  )
}

/** Build the Google Calendar "render" URL with a TZ hint so the event
 *  shows in Stockholm time on the create-event preview screen. */
function googleCalendarUrl() {
  const u = new URL('https://calendar.google.com/calendar/render')
  u.searchParams.set('action', 'TEMPLATE')
  u.searchParams.set('text', t.calendar.title)
  u.searchParams.set('dates', `${event.startUtc}/${event.endUtc}`)
  u.searchParams.set('details', t.calendar.description)
  u.searchParams.set('location', LOCATION)
  u.searchParams.set('ctz', event.timezone)
  return u.toString()
}

/** Outlook Web compose URL. ISO datetimes carry the +02:00 offset so
 *  Outlook knows the absolute moment and converts to the user's TZ. */
function outlookCalendarUrl() {
  const u = new URL('https://outlook.live.com/calendar/0/deeplink/compose')
  u.searchParams.set('path', '/calendar/action/compose')
  u.searchParams.set('rru', 'addevent')
  u.searchParams.set('subject', t.calendar.title)
  u.searchParams.set('startdt', event.startIso)
  u.searchParams.set('enddt', event.endIso)
  u.searchParams.set('location', LOCATION)
  u.searchParams.set('body', t.calendar.description)
  return u.toString()
}

/** Generate + trigger download of a minimal RFC-5545 .ics file. */
function downloadIcs() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d+/, '')
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hani & Roaa//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${event.startUtc}`,
    `DTEND:${event.endUtc}`,
    `SUMMARY:${escapeIcs(t.calendar.title)}`,
    `LOCATION:${escapeIcs(LOCATION)}`,
    `DESCRIPTION:${escapeIcs(t.calendar.description)}`,
    `URL:${t.venue.mapUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'hani-roaa-wedding.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Defer revoke so Safari has time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1500)
}

function escapeIcs(s: string) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/[,;]/g, (m) => '\\' + m)
    .replace(/\r?\n/g, '\\n')
}

function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M3.5 10 H20.5" />
      <path d="M8 3 V7" />
      <path d="M16 3 V7" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-3 w-3 text-[color:var(--color-gold-deep)] rtl:-scale-x-100"
      aria-hidden
    >
      <path
        d="M3 9 L9 3 M5 3 H9 V7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-3 w-3 text-[color:var(--color-gold-deep)]"
      aria-hidden
    >
      <path
        d="M6 1 V8 M3 5.5 L6 8.5 L9 5.5 M2 10.5 H10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
