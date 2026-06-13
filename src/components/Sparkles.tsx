type Spark = {
  left: string
  top: string
  size: number
  duration: number
  delay: number
  color: string
  /** Hide on mobile to reduce paint cost. */
  desktopOnly?: boolean
}

const SPARKS: Spark[] = [
  { left: '8%', top: '12%', size: 8, duration: 4.2, delay: 0, color: 'var(--color-gold)' },
  { left: '24%', top: '24%', size: 5, duration: 3.4, delay: 1.4, color: 'var(--color-gold-deep)', desktopOnly: true },
  { left: '38%', top: '8%', size: 6, duration: 4.8, delay: 0.6, color: 'var(--color-gold)' },
  { left: '52%', top: '18%', size: 7, duration: 5.6, delay: 2.2, color: 'var(--color-gold)', desktopOnly: true },
  { left: '68%', top: '12%', size: 5, duration: 3.8, delay: 0.9, color: 'var(--color-gold-deep)' },
  { left: '82%', top: '22%', size: 8, duration: 4.4, delay: 1.8, color: 'var(--color-gold)', desktopOnly: true },
  { left: '94%', top: '36%', size: 6, duration: 5.0, delay: 0.3, color: 'var(--color-gold-deep)' },
  { left: '12%', top: '42%', size: 7, duration: 5.4, delay: 2.6, color: 'var(--color-gold)', desktopOnly: true },
  { left: '30%', top: '54%', size: 5, duration: 3.6, delay: 1.2, color: 'var(--color-gold)' },
  { left: '46%', top: '46%', size: 6, duration: 4.6, delay: 0.5, color: 'var(--color-gold-deep)', desktopOnly: true },
  { left: '60%', top: '58%', size: 7, duration: 5.2, delay: 2.0, color: 'var(--color-gold)' },
  { left: '76%', top: '50%', size: 5, duration: 3.8, delay: 0.8, color: 'var(--color-gold)', desktopOnly: true },
  { left: '90%', top: '64%', size: 8, duration: 4.8, delay: 1.6, color: 'var(--color-gold-deep)' },
  { left: '6%', top: '72%', size: 6, duration: 4.2, delay: 0.4, color: 'var(--color-gold)', desktopOnly: true },
  { left: '22%', top: '84%', size: 7, duration: 5.6, delay: 1.9, color: 'var(--color-gold)' },
  { left: '40%', top: '76%', size: 5, duration: 3.4, delay: 1.1, color: 'var(--color-gold-deep)', desktopOnly: true },
  { left: '58%', top: '88%', size: 6, duration: 4.8, delay: 0.2, color: 'var(--color-gold)' },
  { left: '74%', top: '78%', size: 8, duration: 5.0, delay: 2.4, color: 'var(--color-gold-deep)', desktopOnly: true },
  { left: '88%', top: '90%', size: 5, duration: 3.6, delay: 0.7, color: 'var(--color-gold)' },
]

export default function Sparkles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {SPARKS.map((s, i) => (
        <div
          key={i}
          className={`sparkle-twinkle absolute ${s.desktopOnly ? 'hidden md:block' : ''}`}
          style={
            {
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              color: s.color,
              willChange: 'transform, opacity',
              ['--duration' as string]: `${s.duration}s`,
              ['--delay' as string]: `${s.delay}s`,
            } as React.CSSProperties
          }
        >
          <SparkIcon />
        </div>
      ))}
    </div>
  )
}

function SparkIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      className="h-full w-full"
      fill="currentColor"
      aria-hidden
    >
      <path d="M6 0 Q6.5 4.5 12 6 Q6.5 7.5 6 12 Q5.5 7.5 0 6 Q5.5 4.5 6 0 Z" />
    </svg>
  )
}
