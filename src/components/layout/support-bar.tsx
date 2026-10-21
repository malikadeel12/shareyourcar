/**
 * What: the trip-support hours bar from the live site.
 * Why: support hours are part of how Share Your Car builds trust.
 * Related: src/components/layout/app-shell.tsx
 */

import Link from "next/link"

export function SupportBar() {
  return (
    <p className="bg-secondary px-4 py-2 text-center text-xs text-secondary-foreground">
      Trip Support: Daily 8 AM–8 PM ET · Urgent issues prioritized · Most
      inquiries answered within 24 hours ·{" "}
      <Link href="/contact" className="underline underline-offset-2">
        Contact support
      </Link>
    </p>
  )
}
