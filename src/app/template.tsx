/**
 * What changed: each page fades and slides in with a CSS animation.
 * Why: the Framer version could stop on the first frame, which left the
 *      page invisible and shifted a little to the right.
 * Related: src/app/globals.css (syc-page), src/components/layout/app-shell.tsx
 * Note: MCP Context 7 — one shared move for every tab. The header and the
 *       bottom bar stay put because they live outside this wrapper.
 *       Reduced motion shows the page immediately.
 */

import type { ReactNode } from "react"

export default function Template({ children }: { children: ReactNode }) {
  return <div className="syc-page">{children}</div>
}
