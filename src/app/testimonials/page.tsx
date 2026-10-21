/**
 * What: guest and host quotes from the live testimonials page.
 * Why: the community page should use those stories, in this site's type and spacing.
 * Related: src/data/site-pages.ts
 */

import type { Metadata } from "next"

import { testimonials } from "@/data/site-pages"

export const metadata: Metadata = {
  title: "Testimonials",
}

export default function TestimonialsPage() {
  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Community</p>
      <h1 className="mt-3 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Testimonials
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Hear from guests and hosts who rent and share on Share Your Car. Stories from the community across the United States.
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <figure key={item.name + item.role} className="flex flex-col justify-between gap-8 rounded-3xl border border-border p-6 md:p-8">
            <blockquote className="font-serif text-2xl leading-snug tracking-[-0.03em] md:text-3xl">
              “{item.quote}”
            </blockquote>
            <figcaption className="text-sm">
              {item.name}
              <span className="text-muted-foreground"> · {item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-10 max-w-xl text-sm text-muted-foreground">
        After a trip, leave a review for your host or guest. Feedback helps the community stay trustworthy.
      </p>
    </article>
  )
}
