/**
 * What: the protection page from shareyourcar.us.
 * Why: checkout only showed two plans. The coverage names and the host rules live here.
 * Related: src/lib/pricing.ts, src/app/legal/page.tsx
 * Business rule: Share Your Car is not an insurer. Bonzah is the licensed broker.
 *                This prototype's checkout still charges Bonzah Basic at $15 a day
 *                and Roamly at $25 a day.
 * MCP Context 7 — tiers follow a modern pricing row: the middle plan is the
 *                dark tile and the amount is the large type. Checkout stays
 *                Bonzah $15 and Roamly $25.
 */

import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { coverageTypes, protectionFaqs, protectionTiers } from "@/data/site-pages"

export const metadata: Metadata = {
  title: "Protection",
}

export default function InsurancePage() {
  return (
    <article>
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-16 md:px-8 md:py-24">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Protection</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Protection options for your trip
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Optional trip protection is offered at checkout for an eligible rental. Share Your Car is not an insurance company and does not underwrite, issue, or guarantee coverage.
        </p>
      </header>

      {/* --- Who provides the policy --- */}
      <section className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-16 md:px-8 md:py-20">
          <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">Through Bonzah</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Bonzah, Pablow Inc., is the licensed broker of record. The carrier is named when a policy is bought. Limits, exclusions, and what the renter still owes are in those documents. Trip protection runs in 24-hour cycles from the scheduled pickup. Every driver must be 21 or older, licensed, and listed on the agreement.
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            On this prototype the checkout choices are Bonzah Basic at $15 a day and Roamly at $25 a day. Bonzah also publishes Basic, Standard, and Premium tiers. Those tiers are described below. Their separate daily prices are confirmed before anyone pays, and they are not the two prices in this checkout.
          </p>
        </div>
      </section>

      {/* --- Coverage names, set large the way a rate card sets a price --- */}
      <section className="mx-auto grid w-full max-w-7xl gap-3 px-4 pb-16 sm:grid-cols-2 md:px-8">
        {coverageTypes.map((item) => (
          <article key={item.mark} className="flex flex-col justify-between gap-8 rounded-[28px] border border-border bg-card p-6">
            <p className="font-serif text-6xl tracking-[-0.04em]">{item.mark}</p>
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </article>
        ))}
      </section>

      {/* --- Tiers: the middle plan is the one a renter compares against --- */}
      <section>
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">Basic, Standard, Premium</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The most a renter would still owe for covered damage, per Bonzah&apos;s published terms.
          </p>
          <div className="mt-10 grid items-stretch gap-3 md:grid-cols-3">
            {protectionTiers.map((tier) => {
              const featured = tier.title === "Standard"
              return (
                <article
                  key={tier.title}
                  className={
                    featured
                      ? "flex flex-col justify-between gap-8 rounded-[28px] bg-primary p-8 text-primary-foreground md:py-12"
                      : "flex flex-col justify-between gap-8 rounded-[28px] border border-border bg-card p-6"
                  }
                >
                  <h3 className="text-sm tracking-[0.16em] uppercase">{tier.title}</h3>
                  <div>
                    <p className="font-serif text-5xl tracking-[-0.04em] md:text-6xl">{tier.owe}</p>
                    <p className={featured ? "mt-3 text-sm leading-relaxed text-primary-foreground/75" : "mt-3 text-sm leading-relaxed text-muted-foreground"}>
                      {tier.body} This is the most still owed for covered damage.
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-4xl tracking-[-0.03em]">For hosts</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Keep an active auto policy that meets your state&apos;s rules. Before you list, ask your insurer whether peer-to-peer sharing is allowed. Commercial or fleet coverage is not always required. It can be, depending on who owns the car, how it is used, how it is registered, and how it is listed.
          </p>
        </div>
        <div>
          <h2 className="font-serif text-4xl tracking-[-0.03em]">In an emergency</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Call 911 first if anyone is hurt. Then message the host and write to support@shareyourcar.us. Trip support is open daily, 8 AM–8 PM ET.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-12">
          <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            Questions
          </h2>
          <div className="flex flex-col lg:col-span-8">
            {protectionFaqs.map((item) => (
              <details key={item.question} className="border-t border-border py-4">
                <summary className="cursor-pointer text-base font-medium">{item.question}</summary>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-20 md:flex-row md:items-end md:justify-between md:px-8">
        <h2 className="max-w-xl font-serif text-4xl leading-[0.95] tracking-[-0.03em] md:text-6xl">
          The plan is chosen when you book.
        </h2>
        <Button nativeButton={false} render={<Link href="/search" />} size="lg">
          Find a car
        </Button>
      </section>
    </article>
  )
}
