"use client"

/**
 * What: Lenis smooth scroll for the marketing pages.
 * Why: the home screen should glide, but motion preferences and dialogs
 *      should not fight a custom scroller.
 * Related: src/app/layout.tsx
 */

import { ReactLenis } from "lenis/react"
import { useEffect, useState, type ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setEnabled(!media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  if (!enabled) {
    return children
  }

  return (
    <ReactLenis root options={{ autoRaf: true, duration: 1.05, lerp: 0.1 }}>
      {children}
    </ReactLenis>
  )
}
