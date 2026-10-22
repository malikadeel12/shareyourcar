"use client"

/**
 * What: a price that counts from the old number to the new one.
 * Why: switching Bonzah and Roamly changes the trip total. The figure
 *      should move, so the renter sees what the choice just cost.
 * Related: src/components/booking/booking-screen.tsx, src/lib/pricing.ts
 * Business rule: the number shown is the quote already calculated
 *                (daily rate, protection, and the 10% service fee).
 * Note: MCP Context 7 — half a second, no blur. Reduced motion jumps.
 */

import { useEffect, useRef, useState } from "react"
import { animate, useReducedMotion } from "framer-motion"

import { formatMoney } from "@/lib/format"
import { cn } from "cn"

export function PriceTally({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const shown = useRef(value)
  const [text, setText] = useState(() => formatMoney(value))

  useEffect(() => {
    if (reduce || shown.current === value) {
      shown.current = value
      setText(formatMoney(value))
      return
    }

    // Count across the gap so $210 does not snap to $240.
    const controls = animate(shown.current, value, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        shown.current = latest
        setText(formatMoney(Math.round(latest)))
      },
    })

    return () => controls.stop()
  }, [reduce, value])

  return <span className={cn("tabular-nums", className)}>{text}</span>
}
