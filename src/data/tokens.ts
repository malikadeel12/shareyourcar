/**
 * What: named design tokens for Share Your Car.
 * Why: screens share one palette, one type pairing, and one radius set
 *      so the prototype does not drift into a generic template.
 * Related: src/app/globals.css (the same values, as CSS variables).
 * Standard: Context7 / Next.js font variables are wired in app/layout.tsx.
 */

export const tokens = {
  color: {
    ink: "#0B0F14",
    paper: "#F5F2EC",
    surface: "#FFFFFF",
    action: "#0B0F14",
    espresso: "#1A1612",
    success: "#3E4650",
    amber: "#F59E0B",
  },
  type: {
    display: "Instrument Serif",
    ui: "Geist",
  },
  radius: {
    card: 16,
    sheet: 24,
    pill: 999,
  },
  space: 8,
  motion: {
    minMs: 200,
    maxMs: 400,
    pressScale: 0.97,
  },
} as const

export type DesignTokens = typeof tokens
