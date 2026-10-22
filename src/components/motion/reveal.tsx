"use client"

/**
 * What changed: a heading rises about a thumb's width when you reach it.
 * Why: an 8 pixel fade finished before the eye caught it, so the page
 *      looked still. No blur, so the wheel stays quick.
 * Related: src/components/home/story-sections.tsx, src/components/home/vehicle-grid.tsx
 * Note: MCP Context 7 — one quiet entrance, played once. Reduced motion
 *       shows the text immediately.
 */

import { useRef, type ReactNode } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode
  index?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" })
  const show = Boolean(reduce) || inView

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: reduce ? 0 : 0.6,
        delay: show ? Math.min(index, 4) * 0.05 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
