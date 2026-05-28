import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

/**
 * Adapted from Aceternity UI's "Container Scroll Animation".
 * - Removed Next.js "use client" directive (Vite handles client by default).
 * - Replaced @/ alias with relative imports.
 * - Re-themed border / background to match Arkai brand tokens.
 *
 * As the user scrolls through the container, the inner card unfolds:
 *   rotateX: 20° → 0°   |   scale: 1.05 → 1   |   header translates up
 */
export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.75, 0.95] : [1.05, 1])
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[55rem] items-center justify-center p-2 md:h-[70rem] md:p-20"
    >
      <div className="relative w-full py-10 md:py-32" style={{ perspective: '1000px' }}>
        <Header translate={translate}>{titleComponent}</Header>
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({
  translate,
  children,
}: {
  translate: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {children}
    </motion.div>
  )
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="mx-auto -mt-8 h-[28rem] w-full max-w-5xl rounded-[28px] border-2 border-line bg-surface-2 p-2 shadow-2xl md:h-[40rem] md:p-4"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl border border-line bg-surface">
        {children}
      </div>
    </motion.div>
  )
}
