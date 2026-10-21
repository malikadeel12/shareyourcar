/**
 * What: the frame around every screen.
 * Why: support hours, navigation, and the footer stay in the same place.
 * Related: src/app/layout.tsx
 */

import { Suspense, type ReactNode } from "react"

import { BottomNav } from "@/components/layout/bottom-nav"
import { LocationMap } from "@/components/layout/location-map"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { SupportBar } from "@/components/layout/support-bar"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SupportBar />
      {/* Pathname is only known in the browser, so the nav streams in. */}
      <Suspense fallback={<div className="h-16 border-b border-border" />}>
        <SiteHeader />
      </Suspense>
      <div id="main" className="flex-1">
        {children}
      </div>
      {/* The live site puts a location map directly above the footer. */}
      <LocationMap />
      <SiteFooter />
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
    </>
  )
}
