"use client"

/**
 * What: a small pull toward the pointer on the main search button.
 * Why: the one call to action on the home screen should feel physical.
 * Related: src/components/home/search-card.tsx
 */

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "cn"

export function Magnetic({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={cn("inline-flex", className)}
      onPointerMove={(event) => {
        if (reduce || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = event.clientX - (rect.left + rect.width / 2)
        const y = event.clientY - (rect.top + rect.height / 2)
        ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0px, 0px)"
      }}
      style={{ transition: "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {children}
    </motion.div>
  )
}
