/**
 * What: the About page, laid out like the newer story pages.
 * Why: two text columns and five equal lines looked too plain.
 * Related: src/data/site-pages.ts, src/app/how-it-works/page.tsx
 * Note: live-site counts such as "250+ drivers" are not used. Six cars are listed.
 * MCP Context 7 — one large photo tile plus smaller tiles, same idea as the
 *       Magic UI bento. Ink and paper stay the brand colors. Lucide, one size.
 */

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  BadgeCheck,
  BadgeDollarSign,
  Clock,
  Gauge,
  MapPin,
  Route,
  Shield,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { aboutDifferences, aboutSafety } from "@/data/site-pages"
import { getVehicle } from "@/data/vehicles"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About",
}

const storyCar = getVehicle("tesla-model-x-2024")
const localCar = getVehicle("jeep-wrangler-2021")

const differenceIcons: LucideIcon[] = [Clock, Smartphone, Route, BadgeDollarSign, MapPin]
const safetyIcons: LucideIcon[] = [BadgeCheck, ShieldCheck, Route, Gauge, Shield]

// The last point, local owners, is the wide photo. The other four sit around it.
const restSpan = ["md:col-span-2", "md:col-span-2", "md:col-span-3", "md:col-span-3"]

export default function AboutPage() {
  const lead = aboutDifferences[4]
  const rest = aboutDifferences.slice(0, 4)
  const LeadIcon = differenceIcons[4]

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

      {/* --- What we do, with a real listed car beside the two ideas --- */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl items-stretch gap-3 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-12">
          {storyCar ? (
            <figure className="relative min-h-80 overflow-hidden rounded-[28px] bg-muted lg:col-span-6 lg:min-h-[36rem]">
              <Image
                src={storyCar.images[0]}
                alt={storyCar.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/50 to-transparent p-6 text-paper">
                <p className="font-serif text-3xl tracking-[-0.03em]">{storyCar.title}</p>
                <p className="mt-1 text-sm text-paper/75">{storyCar.location}</p>
              </figcaption>
            </figure>
          ) : null}
          <div className="flex flex-col gap-3 lg:col-span-6">
            <article className="flex flex-1 flex-col justify-end gap-4 rounded-[28px] border border-border bg-card p-6 md:p-8">
              <h2 className="font-serif text-4xl tracking-[-0.03em]">What we do</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Share Your Car connects drivers with local vehicle owners. Skip the rental counter and the paperwork. Whether you need a car for a few hours, a weekend, or everyday driving, booking stays on one platform.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Browse the cars that are listed, choose the one that fits, and book it. The catalog today is six cars, mostly in New York, plus one Jeep in Albany.
              </p>
            </article>
            <article className="flex flex-1 flex-col justify-end gap-4 rounded-[28px] bg-primary p-6 text-primary-foreground md:p-8">
              <h2 className="font-serif text-4xl tracking-[-0.03em]">Why we built it</h2>
              <p className="text-sm leading-relaxed text-primary-foreground/75">
                Renting should feel easy and transparent. Traditional counters often add hidden fees and long waits. This is the simpler path: find a car and book it from the start of the trip to the end.
              </p>
              <p className="text-sm leading-relaxed text-primary-foreground/75">
                Our mission is to make car sharing simple, secure, and accessible. Transportation should fit real people and real plans.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* --- Five differences, one of them large --- */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <h2 className="max-w-xl font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            What makes us different
          </h2>
          <div className="mt-10 grid gap-3 md:grid-cols-6">
            <article className="group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-[28px] text-paper md:col-span-4 md:row-span-2 md:min-h-[28rem]">
              {localCar ? (
                <Image
                  src={localCar.images[0]}
                  alt={localCar.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-transparent" />
              <div className="relative flex flex-col gap-3 p-6">
                {LeadIcon ? <LeadIcon className="size-5" strokeWidth={1.5} aria-hidden /> : null}
                <h3 className="font-serif text-4xl tracking-[-0.03em]">{lead.title}</h3>
                <p className="max-w-md text-sm leading-relaxed text-paper/80">{lead.body}</p>
              </div>
            </article>
            {rest.map((item, index) => {
              const Icon = differenceIcons[index]
              return (
                <article
                  key={item.title}
                  className={cn(
                    "flex min-h-48 flex-col justify-between gap-6 rounded-[28px] border border-border bg-card p-6",
                    restSpan[index],
                  )}
                >
                  {Icon ? <Icon className="size-5" strokeWidth={1.5} aria-hidden /> : null}
                  <div>
                    <h3 className="font-serif text-2xl tracking-[-0.03em]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* --- Hosts on one side, the safety list on the other --- */}
      <section className="border-t border-border">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-12">
          <article className="flex flex-col justify-between gap-8 rounded-[28px] bg-primary p-8 text-primary-foreground lg:col-span-5">
            <h2 className="font-serif text-4xl tracking-[-0.03em] md:text-5xl">For hosts</h2>
            <div>
              <p className="max-w-md text-sm leading-relaxed text-primary-foreground/75">
                Turn a vehicle into an earning opportunity. List it, manage the calendar, and earn through the same platform. Listing is free.
              </p>
              <Button
                nativeButton={false}
                render={<Link href="/become-host" />}
                variant="outline"
                size="lg"
                className="mt-6 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                Become a host
              </Button>
            </div>
          </article>
          <article className="rounded-[28px] border border-border bg-card p-6 md:p-8 lg:col-span-7">
            <h2 className="font-serif text-4xl tracking-[-0.03em]">Trust and safety</h2>
            <ul className="mt-6 flex flex-col">
              {aboutSafety.map((item, index) => {
                const Icon = safetyIcons[index]
                return (
                  <li key={item} className="flex items-center gap-4 border-t border-border py-4">
                    {Icon ? <Icon className="size-5 shrink-0" strokeWidth={1.5} aria-hidden /> : null}
                    <span className="text-base">{item}</span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Optional coverage is chosen at checkout. Bonzah is the licensed broker. Share Your Car does not underwrite the policy.{" "}
              <Link href="/insurance" className="underline underline-offset-4">
                Read the protection page
              </Link>
              .
            </p>
          </article>
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
