/**
 * What: the legal list and the protection disclosure from shareyourcar.us.
 * Why: the footer should open the same policies the live site names.
 * Related: src/data/site-pages.ts
 */

import type { Metadata } from "next"

import { legalDocs } from "@/data/site-pages"

export const metadata: Metadata = {
  title: "Legal",
}

export default function LegalPage() {
  return (
    <article className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-16 md:px-8 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Legal</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Legal matters
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Policies for using Share Your Car. Minimum renter age is 21 with a valid driver&apos;s license. Questions: support@shareyourcar.us. Policies may be updated, and continued use means the latest version applies.
        </p>
      </header>

      <section className="max-w-3xl">
        <h2 className="font-serif text-4xl tracking-[-0.03em]">Share Your Car is not an insurance company</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Share Your Car does not underwrite, issue, or guarantee insurance coverage. Coverage is provided by Bonzah, a licensed broker. Trip protection runs in 24-hour cycles from the scheduled pickup time. Drivers must be 21 or older, hold a valid license, and be listed on the rental agreement. Policy limits, exclusions, and the renter&apos;s financial responsibility are shown before purchase.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Hosts must keep an active automobile policy that meets state requirements and should confirm with their insurer that peer-to-peer sharing is allowed.
        </p>
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        {legalDocs.map((doc) => (
          <div key={doc.title} className="border-t border-border pt-5">
            <h2 className="text-lg font-semibold tracking-tight">{doc.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{doc.body}</p>
          </div>
        ))}
      </section>
    </article>
  )
}
