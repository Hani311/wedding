import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  className?: string
  /** Direction the line draws from. */
  origin?: 'left' | 'right' | 'center'
  delay?: number
  duration?: number
}

/**
 * A thin gold line that draws in (scaleX 0 → 1) when scrolled into view.
 * Used as section divider accent for a subtle "wedding stationery" feel.
 */
export default function AnimatedDivider({
  className = 'h-px w-20 bg-[color:var(--color-gold-deep)]/50',
  origin = 'left',
  delay = 0,
  duration = 0.9,
}: Props) {
  const reduced = useReducedMotion()
  const transformOrigin =
    origin === 'left' ? '0% 50%' : origin === 'right' ? '100% 50%' : '50% 50%'
  return (
    <motion.span
      className={`divider-line ${className}`}
      style={{ transformOrigin }}
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration, delay, ease: [0.22, 0.9, 0.3, 1] }}
    />
  )
}
