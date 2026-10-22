"use client"

/**
 * What changed: the headline is one line again, not a word-by-word drop.
 * Why: Sixt puts the headline on screen immediately. Splitting it into
 *      bouncing words looked cheap and hid the sentence.
 * Related: src/components/home/home-screen.tsx
 * Note: MCP Context 7 — the first screen should be readable at once.
 */

export function TextSettle({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return <h1 className={className}>{text}</h1>
}
