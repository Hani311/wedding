import { SinglePetal, SingleLeaf } from './florals'

type ParticleConfig = {
  left: string
  size: number
  duration: number
  delay: number
  color: string
  type: 'petal' | 'leaf'
  alt: boolean
  opacity: number
  /** When true the particle is hidden on small viewports — keeps mobile light. */
  desktopOnly?: boolean
}

/**
 * A few drifting petals + leaves — kept deliberately sparse (4 particles)
 * so the page stays calm and the envelope remains the hero. Pure CSS
 * animation via keyframes; values are deterministic so React strict-mode
 * double-mount doesn't shift them. `prefers-reduced-motion` freezes the
 * keyframes in CSS.
 */
const PARTICLES: ParticleConfig[] = [
  { left: '12%', size: 14, duration: 28, delay: -6, color: 'var(--color-leaf-deep)', type: 'leaf', alt: false, opacity: 0.5 },
  { left: '26%', size: 12, duration: 31, delay: -22, color: 'var(--color-blush)', type: 'petal', alt: false, opacity: 0.4, desktopOnly: true },
  { left: '38%', size: 12, duration: 34, delay: -18, color: 'var(--color-petal-soft)', type: 'petal', alt: true, opacity: 0.4, desktopOnly: true },
  { left: '52%', size: 14, duration: 29, delay: -10, color: 'var(--color-leaf)', type: 'leaf', alt: false, opacity: 0.45 },
  { left: '64%', size: 16, duration: 32, delay: -12, color: 'var(--color-leaf)', type: 'leaf', alt: true, opacity: 0.5 },
  { left: '76%', size: 12, duration: 35, delay: -28, color: 'var(--color-petal)', type: 'petal', alt: true, opacity: 0.4, desktopOnly: true },
  { left: '88%', size: 14, duration: 30, delay: -24, color: 'var(--color-leaf-deep)', type: 'leaf', alt: false, opacity: 0.45, desktopOnly: true },
]

export default function FallingPetals() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className={`absolute top-0 ${p.alt ? 'petal-fall-alt' : 'petal-fall'} ${p.desktopOnly ? 'hidden md:block' : ''}`}
          style={
            {
              left: p.left,
              width: p.size,
              height: p.size,
              color: p.color,
              opacity: p.opacity,
              willChange: 'transform, opacity',
              ['--duration' as string]: `${p.duration}s`,
              ['--delay' as string]: `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          {p.type === 'petal' ? (
            <SinglePetal className="h-full w-full" />
          ) : (
            <SingleLeaf className="h-full w-full" />
          )}
        </div>
      ))}
    </div>
  )
}
