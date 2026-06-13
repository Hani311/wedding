import { motion, useReducedMotion } from 'framer-motion'
import { t } from '../i18n/content'

type Props = {
  text: string
  className?: string
  /** Delay between each character (seconds). */
  stagger?: number
  /** Initial delay before the first character (seconds). */
  initialDelay?: number
  /** Duration of each character's fade+rise (seconds). */
  duration?: number
  /** How far each character rises (px). */
  rise?: number
  /** Re-trigger every time the element re-enters the viewport. */
  retrigger?: boolean
}

/**
 * Reveals text as it scrolls into view.
 *
 * In LTR (English) it splits into per-character spans for a staggered fade+lift.
 * That technique is fatal for Arabic — splitting a word into isolated letters
 * breaks the cursive joining and reorders digits — so in RTL we animate the
 * whole string as one unit instead. prefers-reduced-motion renders immediately.
 */
export default function AnimatedText({
  text,
  className = '',
  stagger = 0.06,
  initialDelay = 0,
  duration = 0.9,
  rise = 28,
  retrigger = false,
}: Props) {
  const reduced = useReducedMotion()
  if (reduced) {
    return <span className={className}>{text}</span>
  }

  // Arabic / RTL: animate the whole string (no per-letter split).
  if (t.dir === 'rtl') {
    return (
      <motion.span
        className={`inline-block ${className}`}
        initial={{ opacity: 0, y: rise }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: !retrigger, margin: '-10% 0px -20% 0px' }}
        transition={{ delay: initialDelay, duration, ease: [0.22, 0.9, 0.3, 1] }}
      >
        {text}
      </motion.span>
    )
  }

  return (
    <span className={className} aria-label={text}>
      {Array.from(text).map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: rise }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: !retrigger, margin: '-10% 0px -20% 0px' }}
          transition={{
            delay: initialDelay + i * stagger,
            duration,
            ease: [0.22, 0.9, 0.3, 1],
          }}
          className="inline-block"
          aria-hidden
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  )
}
