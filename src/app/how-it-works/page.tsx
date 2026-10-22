/**
 * What: the How it works page, rebuilt as a photo-and-steps layout.
 * Why: two columns of numbered text looked too plain next to the home page.
 * Related: src/components/layout/step-stage.tsx, src/data/site-pages.ts
 * Note: the live page's guest and host counts are not shown. The catalog is six cars.
 * MCP Context 7 — Magic UI bento spans for "why", SIXT-style photo beside the path.
 *       Same ink, paper, and type as the rest of the site.
 */

import type { Metadata } from "next"
import Link from "next/link"
import {
  BadgeCheck,
  CalendarCheck,
  CarFront,
  Clock,
  Handshake,
  Images,
  KeyRound,
  MapPin,
  Search,
  Shield,
  UserRound,
} from "lucide-react"

import { StepStage } from "@/components/layout/step-stage"
import { Button } from "@/components/ui/button"
import { guestSteps, hostSteps, whyShare } from "@/data/site-pages"
import { faqs } from "@/data/story"
import { getVehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "How it works",
}

const guestCar = getVehicle("tesla-model-y-2023")
const hostCar = getVehicle("jeep-wrangler-2021")

const whyIcons = [Shield, Clock, BadgeCheck, MapPin]

// Mixed spans, the same idea as a Magic UI bento: one large tile, not four equals.
const whySpan = [
  "md:col-span-2 md:row-span-2 md:min-h-80",
  "md:col-span-2",
  "md:col-span-1",
  "md:col-span-1",
]

export default function HowItWorksPage() {
  return (
    <article>
      {/* --- Intro --- */}
      <header className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-16 md:px-8 md:py-24">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">How it works</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          How Share Your Car works
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Book a car from a local host, or list a car you already own. Both stay on one site.
        </p>
      </header>

      {/* --- Guest path, photo on the left --- */}
      {guestCar ? (
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
            <StepStage
              kicker="For guests"
              image={guestCar.images[0]}
              imageAlt={guestCar.title}
              caption={`${guestCar.title} · ${guestCar.location}`}
              steps={guestSteps}
              icons={[Search, CalendarCheck, KeyRound, CarFront]}
            />
          </div>
        </section>
      ) : null}

      {/* --- Host path, photo on the right so the two paths do not match --- */}
      {hostCar ? (
        <section className="border-t border-border bg-card">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
            <StepStage
              kicker="For hosts"
              image={hostCar.images[0]}
              imageAlt={hostCar.title}
              caption={`${hostCar.title} · ${hostCar.location}`}
              steps={hostSteps}
              icons={[UserRound, Images, Handshake, KeyRound]}
              flip
            />
          </div>
        </section>
      ) : null}

      {/* --- Why: one large tile, three smaller ones --- */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <h2 className="max-w-xl font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            Why people use it
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-4">
            {whyShare.map((item, index) => {
              const Icon = whyIcons[index]
              const lead = index === 0
              return (
                <article
                  key={item.title}
                  className={cn(
                    "flex flex-col justify-between gap-6 rounded-[28px] border border-border bg-background p-6",
                    whySpan[index],
                    lead && "bg-primary text-primary-foreground border-transparent",
                  )}
                >
                  {Icon ? <Icon className="size-5" strokeWidth={1.5} aria-hidden /> : null}
                  <div>
                    <h3 className={cn("font-serif tracking-[-0.03em]", lead ? "text-4xl" : "text-2xl")}>
                      {item.title}
                    </h3>
                    <p className={cn("mt-3 text-sm leading-relaxed", lead ? "max-w-sm text-primary-foreground/75" : "text-muted-foreground")}>
                      {item.body}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- Questions, title stays put while the list scrolls on a wide screen --- */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-12">
          <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            Before you book
          </h2>
          <div className="flex flex-col lg:col-span-8">
            {faqs.map((item) => (
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
          Ready to get started?
        </h2>
        <div className="flex gap-3">
          <Button nativeButton={false} render={<Link href="/search" />} size="lg">
            Find a car
          </Button>
          <Button nativeButton={false} render={<Link href="/become-host" />} variant="outline" size="lg">
            List your car
          </Button>
        </div>
      </section>
    </article>
  )
}
