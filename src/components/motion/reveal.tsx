"use client"

/**
 * What: staggered fade used on listing cards.
 * Why: the grid should settle in together, once, instead of each card
 *      inventing its own animation.
 * Related: src/components/home/vehicle-grid.tsx
 */

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

export function Reveal({
  children,
  index = 0,
}: {
  children: ReactNode
  index?: number
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(index, 5) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
