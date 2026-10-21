/**
 * What: the About page, using the live site's sections.
 * Why: a visitor should be able to read who Share Your Car is, in this site's layout.
 * Related: src/data/site-pages.ts, src/components/layout/site-footer.tsx
 */

import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { aboutDifferences, aboutSafety } from "@/data/site-pages"

export const metadata: Metadata = {
  title: "About",
}

export default function AboutPage() {
  return (
    <article>
      {/* --- Intro --- */}
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-16 md:px-8 md:py-24">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">About us</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          About us
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          A smarter way to rent cars from real people — quick, local, and on your terms.
        </p>
      </header>

      {/* --- What we do --- */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">What we do</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Share Your Car connects drivers with local vehicle owners. Skip the rental counter and the paperwork. Whether you need a car for a few hours, a weekend, or everyday driving, booking stays on one platform.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Browse the cars that are listed, choose the one that fits, and book it. The catalog today is six cars, mostly in New York, plus one Jeep in Albany.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">Why we built it</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Renting should feel easy and transparent. Traditional counters often add hidden fees and long waits. This is the simpler path: find a car and book it from the start of the trip to the end.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Our mission is to make car sharing simple, secure, and accessible. Transportation should fit real people and real plans.
            </p>
          </div>
        </div>
      </section>

      {/* --- Differences --- */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">What makes us different</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {aboutDifferences.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Hosts and safety --- */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">For hosts</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/75">
              Turn a vehicle into an earning opportunity. List it, manage the calendar, and earn through the same platform. Listing is free.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">Trust and safety</h2>
            <ul className="mt-6 flex flex-col">
              {aboutSafety.map((item) => (
                <li key={item} className="border-t border-paper/20 py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-paper/70">
              Optional coverage is chosen at checkout. Bonzah is the licensed broker. Share Your Car does not underwrite the policy.
            </p>
          </div>
        </div>
      </section>

      {/* --- Close --- */}
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl leading-[0.95] tracking-[-0.03em] md:text-6xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Find a ride, or list a car. Both start on this site.
          </p>
        </div>
        <div className="flex gap-3">
          <Button nativeButton={false} render={<Link href="/search" />} size="lg">
            Browse vehicles
          </Button>
          <Button nativeButton={false} render={<Link href="/become-host" />} variant="outline" size="lg">
            Become a host
          </Button>
        </div>
      </section>
    </article>
  )
}
