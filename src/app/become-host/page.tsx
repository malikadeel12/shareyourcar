/**
 * What: the become-a-host page from the live site.
 * Why: listing a car needs the steps, the requirements, and the insurance note
 *      before someone opens the host tools.
 * Related: src/data/site-pages.ts, src/app/host/page.tsx
 * Business rule: listing is free. Hosts are paid within 48 hours after a trip,
 *                subject to payment processing and dispute review.
 */

import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cityEarnings } from "@/data/story"
import {
  hostPerks,
  hostQuotes,
  hostRequirements,
  hostSteps,
} from "@/data/site-pages"
import { formatMoney } from "@/lib/format"

export const metadata: Metadata = {
  title: "Become a host",
}

export default function BecomeHostPage() {
  return (
    <article>
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-16 md:px-8 md:py-24">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Hosting</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Turn your vehicle into income
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          List your vehicle, choose your availability, and earn while verified drivers get where they need to go. Share Your Car connects those drivers with owners for daily, weekly, and monthly rentals.
        </p>
      </header>

      {/* --- Steps --- */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-8">
        <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">Getting started</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {hostSteps.map((step, index) => (
            <li key={step.title} className="border-t border-border pt-4">
              <span className="font-serif text-4xl text-primary">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* --- Earnings and perks. City amounts are the live averages, not a promise. --- */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">
              How much could you earn?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/75">
              On average, U.S. hosts who share a car about 15 days a month see figures like these. Actual earnings vary by vehicle, city, and demand.
            </p>
          </div>
          <dl className="lg:col-span-7">
            {cityEarnings.map((row) => (
              <div key={row.city} className="flex items-baseline justify-between gap-6 border-t border-paper/20 py-4">
                <dt>{row.city}</dt>
                <dd className="font-serif text-3xl">{formatMoney(row.amount)}<span className="ml-2 font-sans text-sm text-paper/60">/mo</span></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">Earn with your vehicle</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {hostPerks.map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl tracking-[-0.03em]">Requirements</h2>
            <ul className="mt-6">
              {hostRequirements.map((item) => (
                <li key={item} className="border-t border-border py-3 text-sm">{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Share Your Car may decline or remove a listing that does not meet insurance, registration, or platform rules.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-serif text-4xl tracking-[-0.03em]">Required insurance</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Hosts must keep an active automobile policy that meets state registration and financial-responsibility rules. Before listing, confirm with your insurer that peer-to-peer sharing is allowed and will not cancel or limit the policy.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Share Your Car is not an insurance company and does not underwrite coverage. Coverage is provided by Bonzah, a licensed broker. Compare options with your current insurer and verify them before you list.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <h2 className="font-serif text-4xl tracking-[-0.03em]">Meet the hosts</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {hostQuotes.map((item) => (
            <figure key={item.name} className="rounded-3xl border border-border p-6 md:p-8">
              <blockquote className="font-serif text-2xl leading-snug tracking-[-0.03em]">“{item.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">{item.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-16 md:grid-cols-3 md:px-8 md:pb-24">
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold">Guest support</h3>
          <p className="mt-2 text-sm text-muted-foreground">Trip support is open daily, 8 AM–8 PM ET. Urgent issues are prioritized, so the host is not the only person a guest can call.</p>
        </div>
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold">Host support</h3>
          <p className="mt-2 text-sm text-muted-foreground">Email support@shareyourcar.us. Most inquiries are answered within 24 hours.</p>
        </div>
        <div className="border-t border-border pt-5">
          <h3 className="text-lg font-semibold">If the car breaks down</h3>
          <p className="mt-2 text-sm text-muted-foreground">Contact trip support. The team helps with next steps and roadside guidance when it is available.</p>
        </div>
        <div className="md:col-span-3">
          <Button nativeButton={false} render={<Link href="/host" />} size="lg">
            Open host tools
          </Button>
        </div>
      </section>
    </article>
  )
}
