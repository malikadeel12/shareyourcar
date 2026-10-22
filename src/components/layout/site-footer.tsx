/**
 * What: footer using the live site's columns and legal line.
 * Why: the prototype should close the way Share Your Car does.
 * Related: src/components/layout/app-shell.tsx
 */

import Link from "next/link"

import { LoopForm } from "@/components/layout/loop-form"
import { Wordmark } from "@/components/layout/wordmark"

export function SiteFooter() {
  return (
    <footer className="border-t border-border pb-28 md:pb-10">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:grid-cols-4 md:px-8">
        <div className="flex flex-col gap-3">
          <Wordmark />
          <p className="max-w-xs text-sm text-muted-foreground">
            Peer-to-peer car sharing — rent, host, and earn on Share Your Car.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs tracking-[0.18em] uppercase">Share Your Car</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/search">Inventory</Link></li>
            <li><Link href="/how-it-works">How it works</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/favorites">Favorites</Link></li>
            <li><Link href="/contact">Contact us</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs tracking-[0.18em] uppercase">Hosting</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/become-host">List your car</Link></li>
            <li><Link href="/host-tools">Host tools</Link></li>
            <li><Link href="/host">Your fleet</Link></li>
            <li><Link href="/insurance">Protection & coverage</Link></li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-xs tracking-[0.18em] uppercase">Stay in the loop</h2>
          <p className="text-sm text-muted-foreground">
            Get hosting tips, new features, and deals — no spam, unsubscribe anytime.
          </p>
          <LoopForm />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 border-t border-border px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
        <p>Share Your Car © 2026 · Powered by Cole Atlas Investments · support@shareyourcar.us</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/legal" className="underline underline-offset-2">Terms</Link>
          <Link href="/legal" className="underline underline-offset-2">Privacy</Link>
          <Link href="/legal" className="underline underline-offset-2">Protection disclosure</Link>
        </div>
      </div>
    </footer>
  )
}
