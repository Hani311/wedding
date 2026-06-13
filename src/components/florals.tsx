/**
 * Reusable floral SVGs — kept simple but layered to read as wedding-style
 * watercolor. All accept `className` so the parent controls position, size,
 * opacity, and color via Tailwind/CSS vars.
 */

type Props = { className?: string }

/** Open rose, top-down view. ~5 petal layers radiating from a darker center. */
export function Rose({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {/* outer petal ring */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={`outer-${angle}`}
          cx="50"
          cy="22"
          rx="18"
          ry="22"
          fill="var(--color-petal-soft)"
          transform={`rotate(${angle} 50 50)`}
          opacity="0.85"
        />
      ))}
      {/* middle petal ring (offset rotation) */}
      {[36, 108, 180, 252, 324].map((angle) => (
        <ellipse
          key={`mid-${angle}`}
          cx="50"
          cy="32"
          rx="13"
          ry="16"
          fill="var(--color-petal)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* inner petal cluster */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={`inner-${angle}`}
          cx="50"
          cy="42"
          rx="7"
          ry="9"
          fill="var(--color-blush)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* bud center */}
      <circle cx="50" cy="50" r="5" fill="var(--color-blush-deep)" />
    </svg>
  )
}

/** Peony — fluffier flower with more petal layers. */
export function Peony({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {/* widest outer ruffle */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={`o-${angle}`}
          cx="50"
          cy="20"
          rx="16"
          ry="22"
          fill="var(--color-petal-soft)"
          transform={`rotate(${angle} 50 50)`}
          opacity="0.85"
        />
      ))}
      {/* middle ruffle */}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((angle) => (
        <ellipse
          key={`m-${angle}`}
          cx="50"
          cy="30"
          rx="11"
          ry="16"
          fill="var(--color-petal)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* inner cluster */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={`i-${angle}`}
          cx="50"
          cy="40"
          rx="7"
          ry="10"
          fill="var(--color-blush)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill="var(--color-blush-deep)" />
    </svg>
  )
}

/**
 * Olive branch — a thinner stem with longer, pointed leaves angled along it.
 * Reads more rustic / less floral than the rounded eucalyptus, so it balances
 * out the blossoms.
 */
export function OliveBranch({ className = '' }: Props) {
  const leaves = [
    { x: 18, y: 30, angle: -55 },
    { x: 32, y: 22, angle: -45 },
    { x: 50, y: 18, angle: -30 },
    { x: 70, y: 18, angle: -10 },
    { x: 90, y: 22, angle: 5 },
    { x: 110, y: 28, angle: 18 },
    { x: 130, y: 36, angle: 30 },
    { x: 150, y: 44, angle: 42 },
    { x: 30, y: 44, angle: -130 },
    { x: 50, y: 50, angle: -150 },
    { x: 70, y: 52, angle: -170 },
    { x: 90, y: 50, angle: 175 },
    { x: 110, y: 46, angle: 160 },
  ] as const
  return (
    <svg viewBox="0 0 180 70" className={className} aria-hidden>
      <path
        d="M5 38 Q40 25, 90 32 Q130 38, 175 50"
        stroke="var(--color-leaf-deep)"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {leaves.map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.x}
          cy={leaf.y}
          rx="11"
          ry="3.5"
          fill={i % 2 === 0 ? 'var(--color-leaf-deep)' : 'var(--color-leaf)'}
          transform={`rotate(${leaf.angle} ${leaf.x} ${leaf.y})`}
          opacity="0.88"
        />
      ))}
      {/* a couple of tiny fruit dots */}
      <circle cx="160" cy="48" r="2.4" fill="var(--color-leaf-deep)" />
      <circle cx="170" cy="52" r="2" fill="var(--color-ink-muted)" opacity="0.5" />
    </svg>
  )
}

/** Eucalyptus branch — paired round leaves on a curving stem. */
export function EucalyptusBranch({ className = '' }: Props) {
  // Pre-computed leaf positions along a stem path.
  const leaves = [
    { x: 22, y: 28, angle: -32 },
    { x: 22, y: 52, angle: -148 },
    { x: 50, y: 22, angle: -18 },
    { x: 50, y: 58, angle: -162 },
    { x: 80, y: 24, angle: 8 },
    { x: 80, y: 56, angle: 172 },
    { x: 110, y: 30, angle: 22 },
    { x: 110, y: 50, angle: 158 },
    { x: 140, y: 36, angle: 32 },
    { x: 140, y: 46, angle: 148 },
    { x: 168, y: 40, angle: 40 },
  ] as const
  return (
    <svg viewBox="0 0 200 80" className={className} aria-hidden>
      {/* main stem */}
      <path
        d="M5 40 C 30 30, 60 30, 100 38 C 130 44, 160 42, 195 42"
        stroke="var(--color-leaf-deep)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {leaves.map((leaf, i) => (
        <ellipse
          key={i}
          cx={leaf.x}
          cy={leaf.y}
          rx="9"
          ry="7"
          fill={i % 2 === 0 ? 'var(--color-leaf)' : 'var(--color-leaf-deep)'}
          transform={`rotate(${leaf.angle} ${leaf.x} ${leaf.y})`}
          opacity="0.92"
        />
      ))}
      {/* a single sage bud at the tip */}
      <circle cx="195" cy="42" r="3" fill="var(--color-leaf-deep)" />
    </svg>
  )
}

/** Baby's breath — small white flower clusters on thin stems. */
export function BabysBreath({ className = '' }: Props) {
  const dots = [
    { x: 12, y: 18, r: 2.4 },
    { x: 22, y: 12, r: 2 },
    { x: 30, y: 22, r: 2.6 },
    { x: 38, y: 14, r: 1.8 },
    { x: 48, y: 24, r: 2.2 },
    { x: 56, y: 18, r: 2 },
    { x: 18, y: 30, r: 2 },
    { x: 28, y: 36, r: 2.4 },
    { x: 40, y: 32, r: 2 },
    { x: 52, y: 36, r: 2.4 },
    { x: 60, y: 30, r: 1.8 },
  ]
  return (
    <svg viewBox="0 0 70 50" className={className} aria-hidden>
      {/* tiny stems */}
      <path
        d="M10 50 L 14 30 M22 50 L 24 36 M34 50 L 35 26 M46 50 L 48 30 M58 50 L 56 36"
        stroke="var(--color-leaf-deep)"
        strokeWidth="0.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill="white"
          stroke="var(--color-ink-muted)"
          strokeWidth="0.4"
          opacity="0.9"
        />
      ))}
      {/* center darker dots */}
      {dots.map((d, i) => (
        <circle
          key={`c${i}`}
          cx={d.x}
          cy={d.y}
          r={d.r * 0.35}
          fill="var(--color-gold)"
          opacity="0.6"
        />
      ))}
    </svg>
  )
}

/** Single small leaf (used for falling petals or accents). */
export function SingleLeaf({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 30" className={className} aria-hidden>
      <path
        d="M12 2 Q22 12, 12 28 Q2 12, 12 2 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 4 V26"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.4"
      />
    </svg>
  )
}

/** Small petal shape (used for falling petals). */
export function SinglePetal({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 20 24" className={className} aria-hidden>
      <ellipse cx="10" cy="12" rx="8" ry="11" fill="currentColor" />
    </svg>
  )
}

/** Daisy — 8-petal cream flower with a gold center. Lighter feel than the
 *  rose/peony, balances out the greenery without being too pink. */
export function Daisy({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="30"
          cy="14"
          rx="5"
          ry="11"
          fill="var(--color-cream)"
          stroke="var(--color-ink-muted)"
          strokeWidth="0.35"
          transform={`rotate(${angle} 30 30)`}
          opacity="0.9"
        />
      ))}
      <circle cx="30" cy="30" r="6" fill="var(--color-gold-deep)" />
      <circle cx="30" cy="30" r="3.5" fill="var(--color-gold)" />
    </svg>
  )
}

/** Small 5-petal wildflower — uses a soft blush so it stays delicate. */
export function Wildflower({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cx="25"
          cy="10"
          rx="4.5"
          ry="9"
          fill="var(--color-petal)"
          transform={`rotate(${angle} 25 25)`}
          opacity="0.85"
        />
      ))}
      <circle cx="25" cy="25" r="4" fill="var(--color-gold)" />
      <circle cx="25" cy="25" r="2" fill="var(--color-gold-deep)" />
    </svg>
  )
}

/** Fern frond — feathery sage leaflets paired along a curving stem.
 *  Different texture from eucalyptus (rounded) and olive (long pointed). */
export function Fern({ className = '' }: Props) {
  const pairs = [
    { x: 18, y: 38, len: 8 },
    { x: 30, y: 35, len: 11 },
    { x: 44, y: 33, len: 13 },
    { x: 60, y: 32, len: 15 },
    { x: 76, y: 32, len: 14 },
    { x: 92, y: 33, len: 12 },
    { x: 106, y: 35, len: 10 },
    { x: 120, y: 38, len: 8 },
    { x: 132, y: 42, len: 6 },
  ]
  return (
    <svg viewBox="0 0 150 70" className={className} aria-hidden>
      <path
        d="M5 48 Q35 36, 80 32 Q120 34, 145 44"
        stroke="var(--color-leaf-deep)"
        strokeWidth="0.9"
        fill="none"
        opacity="0.6"
      />
      {pairs.map((p, i) => {
        const upY = p.y - p.len * 0.4
        const downY = p.y + p.len * 0.4
        return (
          <g key={i}>
            <ellipse
              cx={p.x}
              cy={upY}
              rx={p.len * 0.45}
              ry="2.4"
              fill={i % 2 === 0 ? 'var(--color-leaf-deep)' : 'var(--color-leaf)'}
              transform={`rotate(-50 ${p.x} ${upY})`}
              opacity="0.88"
            />
            <ellipse
              cx={p.x}
              cy={downY}
              rx={p.len * 0.45}
              ry="2.4"
              fill={i % 2 === 0 ? 'var(--color-leaf)' : 'var(--color-leaf-deep)'}
              transform={`rotate(50 ${p.x} ${downY})`}
              opacity="0.88"
            />
          </g>
        )
      })}
    </svg>
  )
}

/** Anemone — cream petals around a dark wine center. Reads sophisticated,
 *  classic wedding flower. */
export function Anemone({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden>
      {/* outer 6 petals in soft cream */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={`o-${angle}`}
          cx="30"
          cy="13"
          rx="7"
          ry="13"
          fill="var(--color-cream)"
          stroke="var(--color-ink-muted)"
          strokeWidth="0.35"
          transform={`rotate(${angle} 30 30)`}
          opacity="0.92"
        />
      ))}
      {/* slightly inset second ring for depth */}
      {[30, 90, 150, 210, 270, 330].map((angle) => (
        <ellipse
          key={`i-${angle}`}
          cx="30"
          cy="20"
          rx="4"
          ry="9"
          fill="var(--color-ivory)"
          transform={`rotate(${angle} 30 30)`}
          opacity="0.85"
        />
      ))}
      {/* dark wine center */}
      <circle cx="30" cy="30" r="6" fill="var(--color-wine)" />
      {/* tiny stamen dots */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <circle
          key={`s-${angle}`}
          cx="30"
          cy="26"
          r="0.9"
          fill="var(--color-mustard)"
          transform={`rotate(${angle} 30 30)`}
        />
      ))}
    </svg>
  )
}

/** Ranunculus — tightly layered rose-like flower. Many small petals layered
 *  inward so it reads as a dense ball rather than an open bloom. */
export function Ranunculus({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden>
      {/* outermost loose ring */}
      {[0, 51, 102, 153, 204, 255, 306].map((angle) => (
        <ellipse
          key={`r1-${angle}`}
          cx="40"
          cy="14"
          rx="11"
          ry="14"
          fill="var(--color-petal-soft)"
          transform={`rotate(${angle} 40 40)`}
          opacity="0.85"
        />
      ))}
      {/* second tight ring */}
      {[25, 75, 125, 175, 225, 275, 325].map((angle) => (
        <ellipse
          key={`r2-${angle}`}
          cx="40"
          cy="22"
          rx="9"
          ry="12"
          fill="var(--color-petal)"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
      {/* third ring */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={`r3-${angle}`}
          cx="40"
          cy="30"
          rx="6"
          ry="9"
          fill="var(--color-blush)"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
      {/* center bud */}
      {[0, 90, 180, 270].map((angle) => (
        <ellipse
          key={`r4-${angle}`}
          cx="40"
          cy="36"
          rx="3"
          ry="5"
          fill="var(--color-blush-deep)"
          transform={`rotate(${angle} 40 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="2.5" fill="var(--color-wine)" opacity="0.7" />
    </svg>
  )
}

/** Eucalyptus berry cluster — round bobbles on a small stem. Greenery
 *  texture variation. */
export function EucalyptusBerry({ className = '' }: Props) {
  const berries = [
    { x: 22, y: 18, r: 4 },
    { x: 32, y: 14, r: 3.5 },
    { x: 42, y: 18, r: 4.2 },
    { x: 28, y: 26, r: 3 },
    { x: 38, y: 26, r: 3.5 },
    { x: 48, y: 14, r: 3 },
    { x: 18, y: 26, r: 3 },
    { x: 32, y: 32, r: 3.2 },
  ]
  return (
    <svg viewBox="0 0 70 50" className={className} aria-hidden>
      {/* tiny stems */}
      <path
        d="M22 50 L 22 22 M32 50 L 32 18 M42 50 L 42 22 M28 50 L 28 30 M38 50 L 38 30"
        stroke="var(--color-leaf-deep)"
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.55"
      />
      {berries.map((b, i) => (
        <g key={i}>
          <circle
            cx={b.x}
            cy={b.y}
            r={b.r}
            fill={i % 2 === 0 ? 'var(--color-leaf)' : 'var(--color-leaf-deep)'}
            opacity="0.92"
          />
          {/* highlight dot */}
          <circle
            cx={b.x - b.r * 0.3}
            cy={b.y - b.r * 0.3}
            r={b.r * 0.25}
            fill="white"
            opacity="0.4"
          />
        </g>
      ))}
    </svg>
  )
}

/** Lavender sprig — vertical wand with small dusty-purple florets. Adds a
 *  cooler color note against the warm blush/gold mix. */
export function Lavender({ className = '' }: Props) {
  const florets = [
    { x: 16, y: 8, r: 3 },
    { x: 22, y: 14, r: 3.5 },
    { x: 16, y: 20, r: 3.2 },
    { x: 22, y: 26, r: 3.8 },
    { x: 16, y: 32, r: 3.5 },
    { x: 22, y: 38, r: 3.2 },
    { x: 16, y: 44, r: 3 },
    { x: 22, y: 50, r: 2.8 },
    { x: 16, y: 56, r: 2.4 },
    { x: 22, y: 62, r: 2 },
  ]
  return (
    <svg viewBox="0 0 40 110" className={className} aria-hidden>
      <path
        d="M19 105 Q19 70, 19 40 Q19 20, 19 4"
        stroke="var(--color-leaf-deep)"
        strokeWidth="0.9"
        fill="none"
        opacity="0.55"
      />
      {florets.map((f, i) => (
        <ellipse
          key={i}
          cx={f.x}
          cy={f.y}
          rx={f.r}
          ry={f.r * 0.85}
          fill={
            i % 2 === 0
              ? 'var(--color-lavender)'
              : 'var(--color-lavender-deep)'
          }
          opacity="0.82"
        />
      ))}
      {/* a couple of small leaves at the base */}
      <ellipse
        cx="14"
        cy="78"
        rx="6"
        ry="2"
        fill="var(--color-leaf-deep)"
        transform="rotate(-30 14 78)"
        opacity="0.7"
      />
      <ellipse
        cx="24"
        cy="84"
        rx="6"
        ry="2"
        fill="var(--color-leaf)"
        transform="rotate(30 24 84)"
        opacity="0.7"
      />
    </svg>
  )
}

/** Calla lily — single curled white spathe wrapped around a yellow spadix.
 *  Tall, elegant, very wedding-classic. Used for the side arrangements
 *  framing the envelope. */
export function CallaLily({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 60 130" className={className} aria-hidden>
      {/* stem */}
      <path
        d="M30 130 Q30 100, 30 75"
        stroke="var(--color-leaf-deep)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* outer back of spathe — slightly darker cream to suggest depth */}
      <path
        d="M 26 78 Q 12 55, 22 22 Q 30 4, 38 8 Q 50 18, 44 60 Q 40 78, 30 80 Z"
        fill="var(--color-ivory)"
        stroke="var(--color-ink-muted)"
        strokeWidth="0.4"
        opacity="0.95"
      />
      {/* inner curl — front face of the spathe, brighter */}
      <path
        d="M 30 78 Q 22 60, 28 28 Q 34 12, 40 14 Q 46 22, 42 50 Q 38 70, 32 78 Z"
        fill="var(--color-cream)"
        opacity="0.95"
      />
      {/* yellow spadix poking out of the curl */}
      <ellipse
        cx="32"
        cy="36"
        rx="2.2"
        ry="14"
        fill="var(--color-mustard)"
        opacity="0.9"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="1.4"
        ry="6"
        fill="var(--color-gold-deep)"
        opacity="0.5"
      />
    </svg>
  )
}

/** Anthurium-style heart-shaped leaf — large glossy green leaf used to add
 *  bulk and contrast against the white blooms. */
export function AnthuriumLeaf({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 80 90" className={className} aria-hidden>
      {/* stem */}
      <path
        d="M40 90 Q 40 70, 40 50"
        stroke="var(--color-leaf-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* heart-shaped leaf body */}
      <path
        d="M 40 50 Q 8 50, 5 25 Q 2 5, 22 6 Q 35 8, 40 18 Q 45 8, 58 6 Q 78 5, 75 25 Q 72 50, 40 50 Z"
        fill="var(--color-leaf-deep)"
        opacity="0.92"
      />
      {/* lighter veining for dimension */}
      <path
        d="M 40 50 Q 22 48, 14 28 M 40 50 Q 30 30, 28 14 M 40 50 Q 50 30, 52 14 M 40 50 Q 58 48, 66 28"
        stroke="var(--color-leaf)"
        strokeWidth="0.6"
        fill="none"
        opacity="0.6"
      />
      {/* highlight glaze */}
      <path
        d="M 32 18 Q 22 16, 14 22"
        stroke="var(--color-leaf)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.35"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Hanging amaranthus — long cascading green tendrils made of small bobbles.
 *  Drapes downward beautifully from the side arrangements. */
export function HangingAmaranthus({ className = '' }: Props) {
  // three tendrils of varying length, each made of bobble dots
  const tendrils = [
    { startX: 22, startY: 5, length: 90, sway: 4 },
    { startX: 30, startY: 4, length: 110, sway: 5 },
    { startX: 38, startY: 6, length: 80, sway: 3 },
  ]
  return (
    <svg viewBox="0 0 60 130" className={className} aria-hidden>
      {tendrils.map((t, i) => {
        const dots = []
        for (let y = 0; y < t.length; y += 3) {
          // gentle sinusoidal sway as it cascades down
          const ox = Math.sin(y / 10) * t.sway + (i - 1) * 0.5
          const r = 1.6 - (y / t.length) * 0.8
          const fade = 0.92 - (y / t.length) * 0.45
          dots.push(
            <circle
              key={`${i}-${y}`}
              cx={t.startX + ox}
              cy={t.startY + y}
              r={Math.max(r, 0.7)}
              fill={
                y % 9 < 3
                  ? 'var(--color-leaf-deep)'
                  : y % 9 < 6
                    ? 'var(--color-leaf)'
                    : 'var(--color-mustard)'
              }
              opacity={fade}
            />,
          )
        }
        return <g key={i}>{dots}</g>
      })}
    </svg>
  )
}

/** White peony — cream/ivory variant of the existing Peony. Used in the
 *  envelope-side arrangements for the all-white wedding bouquet feel. */
export function WhitePeony({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {/* widest outer ruffle */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={`o-${angle}`}
          cx="50"
          cy="20"
          rx="16"
          ry="22"
          fill="var(--color-ivory)"
          stroke="var(--color-ink-muted)"
          strokeWidth="0.3"
          transform={`rotate(${angle} 50 50)`}
          opacity="0.92"
        />
      ))}
      {/* middle ruffle */}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((angle) => (
        <ellipse
          key={`m-${angle}`}
          cx="50"
          cy="30"
          rx="11"
          ry="16"
          fill="var(--color-cream)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      {/* inner cluster — slight cream shadow */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={`i-${angle}`}
          cx="50"
          cy="40"
          rx="7"
          ry="10"
          fill="var(--color-page-2)"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill="var(--color-mustard)" opacity="0.8" />
      <circle cx="50" cy="50" r="3" fill="var(--color-gold-deep)" opacity="0.6" />
    </svg>
  )
}

/** Long trailing vine — slim curving stem with widely-spaced leaves.
 *  Designed for vertical edge decoration along the page sides. */
export function TrailingVine({ className = '' }: Props) {
  const leaves = [
    { x: 30, y: 20, angle: 30 },
    { x: 22, y: 55, angle: -45 },
    { x: 35, y: 90, angle: 25 },
    { x: 22, y: 125, angle: -50 },
    { x: 38, y: 160, angle: 35 },
    { x: 22, y: 195, angle: -45 },
    { x: 36, y: 230, angle: 30 },
    { x: 24, y: 265, angle: -50 },
    { x: 36, y: 295, angle: 25 },
  ]
  return (
    <svg viewBox="0 0 60 320" className={className} aria-hidden>
      <path
        d="M30 5 Q22 50, 32 100 Q22 150, 32 200 Q22 250, 30 315"
        stroke="var(--color-leaf-deep)"
        strokeWidth="0.8"
        fill="none"
        opacity="0.55"
      />
      {leaves.map((l, i) => (
        <ellipse
          key={i}
          cx={l.x}
          cy={l.y}
          rx="6.5"
          ry="3"
          fill={i % 2 === 0 ? 'var(--color-leaf-deep)' : 'var(--color-leaf)'}
          transform={`rotate(${l.angle} ${l.x} ${l.y})`}
          opacity="0.85"
        />
      ))}
      {/* a few small buds along the vine */}
      <circle cx="30" cy="35" r="1.4" fill="var(--color-gold)" opacity="0.7" />
      <circle cx="32" cy="175" r="1.4" fill="var(--color-gold)" opacity="0.7" />
      <circle cx="28" cy="280" r="1.4" fill="var(--color-gold)" opacity="0.7" />
    </svg>
  )
}
