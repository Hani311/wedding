import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Anemone, BabysBreath, EucalyptusBranch } from './florals'

/**
 * Light corner greenery — three corners, a handful of elements each.
 * Deliberately sparse so the Lottie envelope stays the hero of the page.
 * Parallax-drifts gently against scroll; disabled for reduced-motion users.
 */
export default function FloralBackground() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()

  const range: [number, number] = reduced ? [0, 0] : [0, 6000]
  const corner1Y = useTransform(scrollY, range, [0, -60])
  const corner1R = useTransform(scrollY, range, [0, 5])
  const corner2Y = useTransform(scrollY, range, [0, 55])
  const corner2R = useTransform(scrollY, range, [0, 6])
  const corner3Y = useTransform(scrollY, range, [0, -70])
  const corner3R = useTransform(scrollY, range, [0, -6])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden rtl:-scale-x-100"
    >
      {/* TOP-LEFT corner bouquet — painted bouquet (public/Hani.webp). */}
      <motion.div
        style={{ y: corner1Y, rotate: corner1R, willChange: 'transform' }}
        className="absolute -left-4 -top-4 w-44 md:w-80 origin-top-left"
      >
        <div className="floral-sway">
          <img
              src={`${import.meta.env.BASE_URL}Hani.webp`}
              alt=""
              width={670}
              height={800}
              decoding="async"
              className="block w-full"
            />
        </div>
      </motion.div>

      {/* TOP-RIGHT cluster — lighter than top-left, balances the hero */}
      <motion.div
        style={{ y: corner3Y, rotate: corner3R, willChange: 'transform' }}
        className="absolute -right-10 -top-8 w-36 md:w-[20rem] origin-top-right -scale-x-100"
      >
        <div className="floral-sway-alt">
          <EucalyptusBranch className="absolute top-0 left-0 w-full rotate-[12deg] opacity-60" />
          <Anemone className="absolute right-24 top-12 w-12 -rotate-6 opacity-70" />
          <BabysBreath className="absolute right-8 top-20 w-14 opacity-55" />
        </div>
      </motion.div>

      {/* BOTTOM-RIGHT corner bouquet — same WebP image as the top-left,
          rotated 180° so the dense cluster hugs the bottom-right corner
          (point-symmetric with the top-left). rotate-180 lives on its own
          wrapper so it composes with the sway animation + parallax instead
          of fighting them for the transform. */}
      <motion.div
        style={{ y: corner2Y, rotate: corner2R, willChange: 'transform' }}
        className="absolute -bottom-4 -right-4 w-44 opacity-70 md:w-80 md:opacity-100 origin-bottom-right"
      >
        <div className="rotate-180">
          <div className="floral-sway-alt">
            <img
              src={`${import.meta.env.BASE_URL}Hani.webp`}
              alt=""
              width={670}
              height={800}
              decoding="async"
              className="block w-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
