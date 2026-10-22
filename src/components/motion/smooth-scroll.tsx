"use client"

/**
 * What changed: the rubber-band scroller was removed.
 * Why: Sixt and other rental sites use the browser's own scroll. The extra
 *      scroller made the wheel feel late, which is what felt slow.
 * Related: src/app/layout.tsx
 * Note: MCP Context 7 — motion should not fight the page. This wrapper stays
 *       so the layout does not have to change.
 */

import type { ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  return children
}
