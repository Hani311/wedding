import { type ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
}

/**
 * Wraps any block in a scroll-triggered fade + lift, driven by the section's
 * own scroll progress (not on/off whileInView) so the motion stays continuous
 * with the rest of the page.
 */
export default function RevealSection({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 30%'],
  })
  // Wider reveal range — section takes more scroll distance to fully fade in,
  // so the headline/text feels like it's gracefully arriving rather than
  // snapping in.
  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.85, 1], [0, 1, 1, 0.6])
  const y = useTransform(scrollYProgress, [0, 0.45], [80, 0])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity, y }}>{children}</motion.div>
    </div>
  )
}
