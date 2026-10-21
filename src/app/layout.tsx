/**
 * What: root layout, fonts, and providers.
 * Why: Instrument Serif and Geist have to be available on every screen,
 *      and theme plus trip state have to survive navigation.
 * Related: src/app/globals.css, src/data/tokens.ts
 * Standard: next/font CSS variables follow the current Next.js App Router
 *           docs retrieved through Context7.
 */

import type { Metadata } from "next"
import { Geist, Instrument_Serif } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { AppShell } from "@/components/layout/app-shell"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { MarketplaceProvider } from "@/components/providers/marketplace-provider"

import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Share Your Car",
    template: "%s · Share Your Car",
  },
  description:
    "Rent the perfect car from local hosts. Peer-to-peer car sharing across the United States.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrument.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <MarketplaceProvider>
            <SmoothScroll>
              <AppShell>{children}</AppShell>
            </SmoothScroll>
          </MarketplaceProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
