import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { t } from '../i18n/content'
import { EucalyptusBranch } from './florals'

type Props = {
  open: boolean
  onClose: () => void
}

type Status = 'idle' | 'loading' | 'success' | 'error'
type Choice = 'yes' | 'no' | null
type Guests = 1 | 2

const WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL as
  | string
  | undefined

export default function RsvpModal({ open, onClose }: Props) {
  const [name, setName] = useState('')
  const [coming, setComing] = useState<Choice>(null)
  const [guests, setGuests] = useState<Guests>(1)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Focus management: on open, remember what was focused (the Reply button)
  // and move focus into the dialog so keyboard/screen-reader users land inside
  // it and the dialog label is announced. On close, return focus to the
  // trigger so they don't get dropped to the top of the page.
  useEffect(() => {
    if (!open) return
    restoreFocusRef.current = document.activeElement as HTMLElement | null
    const id = window.setTimeout(() => dialogRef.current?.focus(), 30)
    return () => {
      window.clearTimeout(id)
      restoreFocusRef.current?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Reset form a beat after close so the user doesn't see fields wipe mid-fade.
  useEffect(() => {
    if (open) return
    const t = setTimeout(() => {
      setName('')
      setComing(null)
      setGuests(1)
      setMessage('')
      setStatus('idle')
      setErrorMsg('')
    }, 250)
    return () => clearTimeout(t)
  }, [open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !coming || status === 'loading') return

    if (!WEBHOOK_URL) {
      // Guest-facing safety net if a build ever ships without the webhook set.
      setStatus('error')
      setErrorMsg(t.rsvp.errorNoWebhook)
      return
    }

    const isComing = coming === 'yes'
    setStatus('loading')
    setErrorMsg('')

    const fields: Array<{ name: string; value: string; inline?: boolean }> = [
      { name: 'Name', value: name.trim(), inline: true },
      {
        name: 'Attending',
        value: isComing ? '✅ Yes' : '❌ No',
        inline: true,
      },
    ]
    if (isComing) {
      fields.push({
        name: 'Guests',
        value: guests === 2 ? '2 (with +1)' : '1',
        inline: true,
      })
    }
    if (message.trim()) {
      fields.push({ name: 'Message', value: message.trim(), inline: false })
    }

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [
            {
              title: '💌 New Wedding RSVP',
              description: `**${name.trim()}** has responded.`,
              color: isComing ? 0xc9a86b : 0xb1c19f,
              fields,
              timestamp: new Date().toISOString(),
              footer: {
                text: `${t.names.combined} · ${t.date.full}`,
              },
            },
          ],
        }),
      })
      if (!res.ok) {
        throw new Error(`Discord returned ${res.status}`)
      }
      setStatus('success')
    } catch (err) {
      console.error('RSVP submit failed:', err)
      setStatus('error')
      setErrorMsg(t.rsvp.errorGeneric)
    }
  }

  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="rsvp-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(54,50,42,0.5)] backdrop-blur-sm px-4 py-6 overflow-y-auto isolate"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-title"
            tabIndex={-1}
            initial={{ scale: 0.94, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{
              type: 'tween',
              duration: 0.32,
              ease: [0.22, 0.9, 0.3, 1],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-[14px] bg-[color:var(--color-cream)] text-[color:var(--color-ink)] shadow-[0_40px_90px_-25px_rgba(54,50,42,0.55)] focus:outline-none"
          >
            {/* Softer floral garnish — single small branch in each top corner,
                lower opacity so the form stays the focus. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-8 w-44 opacity-40"
            >
              <EucalyptusBranch className="w-full -rotate-12" />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-8 w-44 -scale-x-100 opacity-40"
            >
              <EucalyptusBranch className="w-full -rotate-12" />
            </div>

            <button
              type="button"
              aria-label={t.rsvp.close}
              onClick={onClose}
              className="absolute end-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-[color:var(--color-ink-muted)] shadow-sm backdrop-blur transition hover:bg-white hover:text-[color:var(--color-ink)]"
            >
              <svg
                viewBox="0 0 14 14"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M2 2 L12 12 M12 2 L2 12" />
              </svg>
            </button>

            <div className="relative px-6 pb-7 pt-12 md:px-10 md:pt-14 md:pb-10">
              <div className="text-center">
                <p className="text-[11px] uppercase tracking-[0.45em] text-[color:var(--color-gold-text)]">
                  {t.rsvp.eyebrow}
                </p>
                <h3
                  id="rsvp-title"
                  className="font-display mt-3 text-3xl tracking-tight text-[color:var(--color-ink)] md:text-4xl"
                >
                  {status === 'success'
                    ? coming === 'yes'
                      ? t.rsvp.successTitleYes
                      : t.rsvp.successTitleNo
                    : t.rsvp.modalTitle}
                </h3>
                <p className="font-script mt-2 text-2xl text-[color:var(--color-gold-deep)] md:text-3xl">
                  {t.date.full}
                </p>
              </div>

              {status === 'success' ? (
                <SuccessView
                  name={name.trim()}
                  isComing={coming === 'yes'}
                  onClose={onClose}
                />
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-ink-muted)]">
                      {t.rsvp.nameLabel}
                    </span>
                    <input
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full border-b border-[color:var(--color-ink-muted)]/30 bg-transparent py-2.5 font-display text-xl italic text-[color:var(--color-ink)] outline-none transition focus:border-[color:var(--color-gold-deep)] focus-visible:border-[color:var(--color-gold-deep)]"
                    />
                  </label>

                  <fieldset>
                    <legend className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-ink-muted)]">
                      {t.rsvp.comingLegend}
                    </legend>
                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <OptionCard
                        checked={coming === 'yes'}
                        onChange={() => setComing('yes')}
                        label={t.rsvp.yesLabel}
                        sublabel={t.rsvp.yesSub}
                        tone="yes"
                      />
                      <OptionCard
                        checked={coming === 'no'}
                        onChange={() => setComing('no')}
                        label={t.rsvp.noLabel}
                        sublabel={t.rsvp.noSub}
                        tone="no"
                      />
                    </div>
                  </fieldset>

                  <AnimatePresence initial={false}>
                    {coming === 'yes' && (
                      <motion.fieldset
                        key="guests"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <legend className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-ink-muted)]">
                          {t.rsvp.guestsLegend}
                        </legend>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <GuestPill
                            checked={guests === 1}
                            onChange={() => setGuests(1)}
                            label={t.rsvp.justMe}
                          />
                          <GuestPill
                            checked={guests === 2}
                            onChange={() => setGuests(2)}
                            label={t.rsvp.plusOne}
                          />
                        </div>
                      </motion.fieldset>
                    )}
                  </AnimatePresence>

                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-ink-muted)]">
                      {t.rsvp.noteLabel}{' '}
                      <span className="lowercase tracking-normal text-[color:var(--color-ink-muted)]/60">
                        {t.rsvp.noteOptional}
                      </span>
                    </span>
                    <textarea
                      rows={2}
                      maxLength={300}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.rsvp.notePlaceholder}
                      className="mt-2 w-full resize-none rounded-md border border-[color:var(--color-ink-muted)]/20 bg-white/40 px-3 py-2.5 font-display text-base italic text-[color:var(--color-ink)] outline-none transition placeholder:text-[color:var(--color-ink-muted)]/50 focus:border-[color:var(--color-gold-deep)] focus:bg-white/70 focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold-deep)]/50"
                    />
                  </label>

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="text-center text-sm text-[color:var(--color-wax)]"
                    >
                      {errorMsg || t.rsvp.errorGeneric}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      status === 'loading' || !name.trim() || !coming
                    }
                    className="relative w-full overflow-hidden rounded-md bg-[#7d6531] py-3.5 text-[11px] uppercase tracking-[0.45em] text-white shadow-md transition hover:bg-[#85703a] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#7d6531]"
                  >
                    {status === 'loading' ? t.rsvp.sending : t.rsvp.send}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function OptionCard({
  checked,
  onChange,
  label,
  sublabel,
  tone,
}: {
  checked: boolean
  onChange: () => void
  label: string
  sublabel: string
  tone: 'yes' | 'no'
}) {
  const tones = {
    yes: {
      borderChecked: 'has-[:checked]:border-[color:var(--color-gold-deep)]',
      bgChecked: 'has-[:checked]:bg-[color:var(--color-gold)]/10',
      iconBg: 'bg-[color:var(--color-gold)]/20',
      iconColor: 'text-[color:var(--color-gold-deep)]',
    },
    no: {
      borderChecked: 'has-[:checked]:border-[color:var(--color-leaf-deep)]',
      bgChecked: 'has-[:checked]:bg-[color:var(--color-leaf)]/15',
      iconBg: 'bg-[color:var(--color-leaf)]/30',
      iconColor: 'text-[color:var(--color-leaf-deep)]',
    },
  } as const
  const t = tones[tone]

  return (
    <label
      className={`group relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-[color:var(--color-ink-muted)]/15 bg-white/40 px-5 py-5 text-center transition hover:bg-white/60 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[color:var(--color-gold-deep)] has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-[color:var(--color-cream)] ${t.borderChecked} ${t.bgChecked}`}
    >
      <input
        type="radio"
        name="coming"
        required
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full ${t.iconBg} ${t.iconColor}`}
        aria-hidden
      >
        {tone === 'yes' ? <FluteIcon /> : <LeafIcon />}
      </span>
      <span className="font-display text-base italic leading-tight text-[color:var(--color-ink)] md:text-lg">
        {label}
      </span>
      <span className="text-[9px] uppercase tracking-[0.4em] text-[color:var(--color-ink-muted)]">
        {sublabel}
      </span>
    </label>
  )
}

function GuestPill({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-center rounded-md border px-4 py-2.5 text-sm font-display italic transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[color:var(--color-gold-deep)] has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-[color:var(--color-cream)] ${
        checked
          ? 'border-[color:var(--color-gold-deep)] bg-[color:var(--color-gold)]/15 text-[color:var(--color-ink)]'
          : 'border-[color:var(--color-ink-muted)]/20 bg-white/40 text-[color:var(--color-ink-muted)] hover:bg-white/60'
      }`}
    >
      <input
        type="radio"
        name="guests"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  )
}

function SuccessView({
  name,
  isComing,
  onClose,
}: {
  name: string
  isComing: boolean
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  // Move focus to the Close button when the success view replaces the form,
  // so focus doesn't fall to <body> and the new state is reachable.
  useEffect(() => {
    closeRef.current?.focus()
  }, [])
  return (
    <div className="mt-8 text-center" role="status">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 16,
          delay: 0.05,
        }}
        className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full ${
          isComing
            ? 'bg-[color:var(--color-petal)]'
            : 'bg-[color:var(--color-leaf)]/40'
        }`}
      >
        <svg
          viewBox="0 0 16 16"
          className="h-6 w-6 text-[color:var(--color-ink)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8.5 L7 12.5 L13 4.5" />
        </svg>
      </motion.div>
      <p className="font-display text-2xl italic text-[color:var(--color-ink)]">
        {t.rsvp.thanks(name)}
      </p>
      <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">
        {isComing ? t.rsvp.comingYesMsg : t.rsvp.comingNoMsg}
      </p>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="mt-7 inline-block rounded-md border border-[color:var(--color-gold-deep)]/60 px-7 py-2.5 text-[10px] uppercase tracking-[0.5em] transition hover:border-[color:var(--color-gold-deep)] hover:bg-[color:var(--color-gold-deep)] hover:text-white"
      >
        {t.rsvp.close}
      </button>
    </div>
  )
}

function FluteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* champagne flute — universal "celebrate" icon */}
      <path d="M8 3 H16 L14.6 11.5 A2.6 2.6 0 0 1 9.4 11.5 Z" />
      <path d="M12 14 V20" />
      <path d="M9 20 H15" />
      {/* a bubble */}
      <circle cx="11" cy="7.5" r="0.6" fill="currentColor" />
      <circle cx="13" cy="9" r="0.5" fill="currentColor" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden
    >
      <path d="M5 19c0-9 7-15 15-15-1 9-6 15-15 15Zm0 0c2-3 4-5 7-7" stroke="currentColor" strokeWidth="0" />
      <path d="M4 20c0-9 7-15 16-15-1 9-6 15-15 15-1 0-1-0-1-0Z" />
      <path d="M5 19c2-3 4-5 7-7" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}
