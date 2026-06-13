import { motion, useReducedMotion } from 'framer-motion'

/**
 * Subtle gold ornament + paired hairlines that sits between the major
 * vertical sections. Animates in once when scrolled into view so the page
 * doesn't feel like 5 stacked text blocks.
 */
export default function SectionDivider() {
  const reduced = useReducedMotion()
  const baseTransition = reduced
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.22, 0.9, 0.3, 1] as [number, number, number, number] }
  return (
    <div
      aria-hidden
      className="pointer-events-none mx-auto flex max-w-3xl items-center justify-center gap-5 px-6 py-6 md:gap-7"
    >
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={baseTransition}
        style={{ transformOrigin: 'right center' }}
        className="block h-px w-24 bg-[color:var(--color-gold-deep)]/40 md:w-40"
      />
      <motion.svg
        viewBox="0 0 24 24"
        initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ ...baseTransition, delay: reduced ? 0 : 0.15 }}
        className="h-3 w-3 text-[color:var(--color-gold-deep)] md:h-4 md:w-4"
        fill="currentColor"
      >
        <path d="M12 2 L13.6 10.4 L22 12 L13.6 13.6 L12 22 L10.4 13.6 L2 12 L10.4 10.4 Z" />
      </motion.svg>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={baseTransition}
        style={{ transformOrigin: 'left center' }}
        className="block h-px w-24 bg-[color:var(--color-gold-deep)]/40 md:w-40"
      />
    </div>
  )
}
