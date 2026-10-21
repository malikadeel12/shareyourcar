"use client"

/**
 * What: how it works, host stories, and the protection note.
 * Why: trust sits beside the cars, in the site's own words, not as three
 *      identical feature cards.
 * Related: src/data/bookings.ts
 */

import { bookingSteps, hostStories } from "@/data/bookings"

export function TrustStrip() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Car rental process
          </p>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.03em] md:text-6xl">
            Book your ride in four simple steps
          </h2>
          <ol className="mt-8 flex flex-col gap-6">
            {bookingSteps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="font-serif text-3xl text-secondary">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-7 lg:pt-16">
          {hostStories.map((story, index) => (
            <figure
              key={story.name}
              className={
                index === 0
                  ? "rounded-3xl bg-secondary px-6 py-8 text-secondary-foreground md:px-8"
                  : "rounded-3xl border border-border bg-card px-6 py-6"
              }
            >
              <blockquote className={index === 0 ? "font-serif text-3xl leading-snug" : "text-base leading-relaxed"}>
                “{story.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm">
                {story.name}
                <span className={index === 0 ? "text-secondary-foreground/80" : "text-muted-foreground"}>
                  {" "}
                  · {story.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <aside className="mt-12 rounded-3xl border border-border bg-card px-6 py-6 md:px-8">
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Protection partners
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Share Your Car is not an insurance company and does not underwrite,
          issue, or guarantee insurance coverage. Coverage is provided by
          Bonzah, a licensed broker. Optional trip protection is chosen at
          checkout. Drivers must be 21 or older, hold a valid license, and be
          listed on the rental agreement.
        </p>
      </aside>
    </section>
  )
}
