"use client"

/**
 * What: count-up number, adapted from Magic UI's Number Ticker.
 * Why: host earnings should arrive as a figure, not pop in as a static digit.
 * Related: src/components/host/host-screen.tsx
 */

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

import { cn } from "cn"

type NumberTickerProps = {
  value: number
  className?: string
  prefix?: string
}

export function NumberTicker({ value, className, prefix = "" }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: "0px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
          }).format(Math.round(latest))}`
        }
      }),
    [prefix, springValue]
  )

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}0
    </span>
  )
}
