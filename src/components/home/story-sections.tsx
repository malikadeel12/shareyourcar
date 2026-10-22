/**
 * What: the longer brand sections under the catalog.
 * Why: a premium car-sharing site has to show who it is for, what hosts
 *      earn, how a trip works, and the real questions guests ask.
 *      Offer tiles and the full-screen quote follow the SIXT rental layout.
 * Related: src/data/story.ts, src/data/bookings.ts
 */

import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, CalendarCheck, CalendarRange, Car, CarFront, Clock, FileText, KeyRound, Search, Shield, ShieldCheck, Wallet } from "lucide-react"

import { StepStage } from "@/components/layout/step-stage"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { bookingSteps, hostStories } from "@/data/bookings"
import { audiences, cityEarnings, faqs } from "@/data/story"
import { getVehicle, listedStops, sampleTrip, type Vehicle } from "@/data/vehicles"
import { formatMoney } from "@/lib/format"
import { bookHref, searchHref } from "@/lib/search"
import { cn } from "@/lib/utils"

const feature = getVehicle("jeep-wrangler-4xe-2021")

// --- Shared title entrance ---
// Big section titles use one blur-fade so the page does not invent a new
// animation for every heading.
function FadeHeading({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <Reveal>
      <h2 id={id} className={className}>
        {children}
      </h2>
    </Reveal>
  )
}

export function FeaturedSpread() {
  if (!feature) return null

  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted lg:col-span-7 lg:aspect-[5/4]">
        <Image
          src={feature.images[0]}
          alt={feature.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-5 lg:col-span-5 lg:pl-6">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
          Available now · Albany, Georgia
        </p>
        <FadeHeading className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-6xl">
          {feature.title}
        </FadeHeading>
        <p className="text-base leading-relaxed text-muted-foreground">
          {feature.description}
        </p>
        <ul className="flex flex-wrap gap-2">
          {feature.features.map((item) => (
            <li key={item} className="rounded-full border border-border px-3 py-1 text-sm">
              {item}
            </li>
          ))}
        </ul>
        <p className="font-serif text-5xl tracking-tight">
          {formatMoney(feature.pricePerDay)}
          <span className="ml-2 font-sans text-base text-muted-foreground">per day</span>
        </p>
        <div>
          <Button
            nativeButton={false}
            render={<Link href={bookHref(feature.id, sampleTrip.from, sampleTrip.to)} />}
            size="lg"
          >
            Book this Jeep
          </Button>
        </div>
      </div>
    </section>
  )
}

export function Audiences() {
  return (
    // Cream, same as the page. The title sits on top and the six groups
    // share the width, so the left side is not left empty under a short headline.
    <section className="bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Who uses Share Your Car
          </p>
          <FadeHeading className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Mobility for every journey
          </FadeHeading>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
            A work assignment, an airport arrival, or a week while your own car is being repaired. Local hosts cover the gap.
          </p>
        </div>
        <ol className="mt-12 grid gap-x-16 md:grid-cols-2">
          {audiences.map((audience, index) => (
            <li key={audience.title} className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-border py-5">
              <span className="font-serif text-2xl">0{index + 1}</span>
              <div>
                <h3 className="text-xl tracking-tight">{audience.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {audience.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function TripSteps() {
  const stepCar = getVehicle("tesla-model-3-2023")
  if (!stepCar) return null

  return (
    // The four steps used to be equal text columns. The car photo is what
    // makes the path feel like a rental site instead of a checklist.
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
        Car rental process
      </p>
      <FadeHeading className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Book your ride in four simple steps
      </FadeHeading>
      <div className="mt-12">
        <StepStage
          image={stepCar.images[0]}
          imageAlt={stepCar.title}
          caption={`${stepCar.title} · ${stepCar.location}`}
          steps={bookingSteps}
          icons={[Search, CalendarCheck, KeyRound, CarFront]}
        />
      </div>
      <p className="mt-8 max-w-xl text-sm text-muted-foreground">
        Most trips are approved within 8 hours. Hosts are paid within 48 hours after the trip ends, subject to payment processing and dispute review.
      </p>
    </section>
  )
}

export function EarningsBoard() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs tracking-[0.22em] text-paper/60 uppercase">
            For hosts
          </p>
          <FadeHeading className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
            Turn your car into income
          </FadeHeading>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/75">
            On average, U.S. hosts who share a car about 15 days a month see figures like these. Actual earnings vary by vehicle, city, and demand. Listing is free.
          </p>
          {/* Host tools cover one owner or a small fleet. This is the live-site promise, kept next to the earnings. */}
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/75">
            One dashboard for a single car or a small fleet: price, calendar, weekly and monthly demand, verification, and payouts.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/become-host" />}
            size="lg"
            className="mt-8"
          >
            Become a host
          </Button>
        </div>
        <dl className="lg:col-span-7">
          {cityEarnings.map((row) => (
            <div key={row.city} className="flex items-baseline justify-between gap-6 border-t border-paper/20 py-5">
              <dt className="text-lg">{row.city}</dt>
              <dd className="font-serif text-4xl tracking-tight md:text-5xl">
                {formatMoney(row.amount)}
                <span className="ml-2 font-sans text-sm text-paper/60">/mo</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Stories() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="host-stories">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Community</p>
        <FadeHeading id="host-stories" className="mt-2 font-serif text-5xl tracking-[-0.04em] md:text-7xl">
          From the road
        </FadeHeading>
      </div>
      <div className="mt-8 flex gap-4 overflow-x-auto px-4 pb-2 snap-x md:px-8">
        {hostStories.map((story) => (
          <figure
            key={story.name}
            className="flex w-[85vw] shrink-0 snap-start flex-col justify-between rounded-3xl border border-border bg-card p-6 md:w-[32rem] md:p-8"
          >
            <blockquote className="font-serif text-3xl leading-snug tracking-[-0.03em]">
              “{story.quote}”
            </blockquote>
            <figcaption className="mt-8 text-sm">
              {story.name}
              <span className="text-muted-foreground"> · {story.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export function ProtectionBand() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 md:grid-cols-12 md:px-8">
      <div className="rounded-3xl bg-card px-6 py-8 md:col-span-7 md:px-10">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
          Protection
        </p>
        <FadeHeading className="mt-3 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
          Coverage is chosen at checkout
        </FadeHeading>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Share Your Car is not an insurance company and does not underwrite, issue, or guarantee insurance coverage. Coverage is provided by Bonzah, a licensed broker. Trip protection runs in 24-hour cycles from the scheduled pickup. Drivers must be 21 or older, licensed, and listed on the agreement.
        </p>
      </div>
      <div className="flex flex-col justify-between rounded-3xl border border-border px-6 py-8 md:col-span-5">
        <div>
          <p className="text-sm text-muted-foreground">Bonzah Basic Renter Protection</p>
          <p className="mt-2 font-serif text-5xl">$15<span className="font-sans text-base text-muted-foreground">/day</span></p>
        </div>
        <div className="mt-8">
          <p className="text-sm text-muted-foreground">Roamly Host Insurance Full Coverage</p>
          <p className="mt-2 font-serif text-5xl">$25<span className="font-sans text-base text-muted-foreground">/day</span></p>
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    // Same width as the sections around it. A narrow centered column
    // left empty space on both sides and made this block look unfinished.
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Questions</p>
      <FadeHeading className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Before you book
      </FadeHeading>
      <div className="mt-10 border-b border-border">
        {faqs.map((item) => (
          <details key={item.question} className="group border-t border-border py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg tracking-tight [&::-webkit-details-marker]:hidden">
              {item.question}
              <span aria-hidden className="font-serif text-3xl leading-none group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

const trustFacts = [
  {
    icon: ShieldCheck,
    title: "Verified community",
    body: "Hosts and renters are screened. You see the host’s name, and identity is checked before a trip is confirmed.",
  },
  {
    icon: CalendarRange,
    title: "Flexible booking",
    body: "Daily, weekly, and monthly trips. Some cars can be booked instantly when the calendar is open.",
  },
  {
    icon: Clock,
    title: "Answers the same day",
    body: "Most trips are approved within 8 hours. Hosts are paid within 48 hours after the trip.",
  },
]

export function CityStops() {
  const stops = listedStops()

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-8 md:py-16">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
        Find cars near you
      </p>
      <FadeHeading className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Where the cars are listed
      </FadeHeading>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {stops.map((stop) => (
          <Link
            key={stop.city}
            href={searchHref({ where: stop.city, from: sampleTrip.from, to: sampleTrip.to })}
            className="flex items-end justify-between gap-4 rounded-3xl border border-border px-6 py-6"
          >
            <div>
              <h3 className="font-serif text-4xl tracking-[-0.03em]">{stop.city}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {stop.count} {stop.count === 1 ? "car" : "cars"} listed
              </p>
            </div>
            <span className="text-sm">Search</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

const readiness = [
  {
    icon: BadgeCheck,
    title: "Verified drivers",
    body: "Drivers must be 21 or older, licensed, and listed on the agreement.",
  },
  {
    icon: Wallet,
    title: "Secure payments",
    body: "Checkout shows a card form. This prototype does not charge the card.",
  },
  {
    icon: FileText,
    title: "Agreements",
    body: "The trip terms are confirmed before the car is released to the renter.",
  },
  {
    icon: Shield,
    title: "Insurance",
    body: "Bonzah is the licensed broker. Share Your Car does not underwrite coverage.",
  },
  {
    icon: Car,
    title: "Vehicle protection",
    body: "Renter protection starts at $15 a day. The host plan is $25 a day.",
  },
]

export function TrustReady() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
        Before the keys
      </p>
      <FadeHeading className="mt-3 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Built for trust
      </FadeHeading>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {readiness.map((item) => (
          <div key={item.title} className="border-t border-border pt-5">
            <item.icon aria-hidden className="size-5" strokeWidth={1.75} />
            <h3 className="mt-4 text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TrustRow() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-14 md:grid-cols-3 md:px-8 md:py-16">
      {trustFacts.map((fact) => (
        <div key={fact.title} className="border-t border-border pt-5">
          <fact.icon aria-hidden className="size-5" strokeWidth={1.75} />
          <h2 className="mt-4 text-lg font-semibold tracking-tight">{fact.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fact.body}</p>
        </div>
      ))}
    </section>
  )
}

function PriceMark({ amount }: { amount: number }) {
  return (
    <div className="absolute top-5 left-5 border border-paper/90 px-4 py-3 text-paper">
      <p className="text-[10px] tracking-[0.22em] uppercase">From</p>
      <p className="font-serif text-4xl leading-none">{formatMoney(amount)}</p>
      <p className="mt-1 text-xs">a day</p>
    </div>
  )
}

function OfferCard({
  vehicle,
  className,
  lead = false,
}: {
  vehicle: Vehicle
  className?: string
  lead?: boolean
}) {
  return (
    <Link
      href={bookHref(vehicle.id, sampleTrip.from, sampleTrip.to)}
      className={cn(
        "group relative flex h-full min-h-[220px] overflow-hidden rounded-[28px] bg-ink text-paper",
        lead && "min-h-[460px]",
        className
      )}
    >
      <Image
        src={vehicle.images[0]}
        alt=""
        fill
        sizes={lead ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 50vw, 25vw"}
        className="object-cover motion-safe:transition motion-safe:duration-500 motion-safe:group-hover:scale-[1.06]"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: lead
            ? "linear-gradient(to top, rgba(11,15,20,0.88) 0%, rgba(11,15,20,0.12) 52%, rgba(11,15,20,0.2) 100%)"
            : "linear-gradient(to top, rgba(11,15,20,0.82) 0%, rgba(11,15,20,0.05) 60%)",
        }}
      />
      {lead ? <PriceMark amount={vehicle.pricePerDay} /> : null}
      <div className={cn("relative mt-auto flex w-full flex-col gap-2 p-5", lead && "gap-3 p-6 md:p-8")}>
        {lead ? null : (
          <p className="font-serif text-3xl leading-none">{formatMoney(vehicle.pricePerDay)}</p>
        )}
        <h3
          className={cn(
            "max-w-md font-serif leading-[0.95] tracking-[-0.03em]",
            lead ? "text-4xl md:text-6xl" : "text-2xl"
          )}
        >
          {vehicle.title}
        </h3>
        <p className="text-sm text-paper/80">{vehicle.location}</p>
        {lead ? (
          <span className="mt-1 inline-flex h-10 w-fit items-center rounded-full bg-paper px-4 text-sm font-medium text-ink">
            Book now
          </span>
        ) : null}
      </div>
    </Link>
  )
}

export function OfferMosaic() {
  // One spread for the whole catalog. The same six cars used to appear
  // as tiles, then a row, then a grid, and the page started to feel like a list.
  const lead = getVehicle("jeep-wrangler-2021")
  const restIds = [
    "tesla-model-3-2023",
    "tesla-model-y-2023",
    "tesla-model-x-2024",
    "jeep-wrangler-4xe-2021",
    "tesla-model-s-2024",
  ]
  const rest = restIds
    .map((id) => getVehicle(id))
    .filter((vehicle): vehicle is Vehicle => Boolean(vehicle))
  if (!lead || rest.length !== restIds.length) return null

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-6 md:px-8">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">On the fleet</p>
      <FadeHeading className="mt-2 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Real cars. Real daily rates.
      </FadeHeading>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <OfferCard
          vehicle={lead}
          lead
          className="sm:col-span-2 lg:col-span-4 lg:row-span-2"
        />
        {rest.map((vehicle, index) => (
          <OfferCard
            key={vehicle.id}
            vehicle={vehicle}
            className={index === rest.length - 1 ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-2"}
          />
        ))}
      </div>
    </section>
  )
}

const moreWays = [
  {
    href: "/search",
    kicker: "Rent",
    title: "Peer-to-peer car rental",
    body: "Six cars from local hosts, from $50 a day. You book the exact car in the photo.",
  },
  {
    href: "/become-host",
    kicker: "Host",
    title: "Earn with your vehicle",
    body: "Listing is free. You set the price, the calendar, and which requests to accept.",
  },
  {
    href: "/search",
    kicker: "Dates",
    title: "Flexible vehicle booking",
    body: "Daily, weekly, and monthly trips, with instant booking when the car is free.",
  },
  {
    href: "/insurance",
    kicker: "Trust",
    title: "Secure car sharing",
    body: "Identity is checked before pickup. Protection is chosen at checkout through Bonzah.",
  },
]

export function MoreWays() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <p className="text-xs tracking-[0.22em] text-paper/70 uppercase">What we’re offering</p>
        <FadeHeading className="mt-3 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Everything you need to rent or share
        </FadeHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {moreWays.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex min-h-64 flex-col justify-between rounded-[28px] border border-paper/15 p-6 motion-safe:transition motion-safe:duration-200 motion-safe:hover:border-paper/50"
            >
              <p className="text-xs tracking-[0.22em] text-paper/70 uppercase">{item.kicker}</p>
              <div>
                <h3 className="font-serif text-3xl tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{item.body}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function QuoteStage() {
  const photo = getVehicle("tesla-model-y-2023")
  const story = hostStories[0]
  if (!photo) return null

  return (
    <section className="relative min-h-[78svh] overflow-hidden bg-ink text-paper">
      <Image
        src={photo.images[1] ?? photo.images[0]}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(11,15,20,0.82) 0%, rgba(11,15,20,0.35) 50%, rgba(11,15,20,0.2) 100%)",
        }}
      />
      <figure className="relative mx-auto flex min-h-[78svh] w-full max-w-5xl flex-col justify-end px-4 py-16 md:px-8 md:py-24">
        <blockquote className="font-serif text-4xl leading-[1.05] tracking-[-0.03em] md:text-6xl">
          “{story.quote}”
        </blockquote>
        <figcaption className="mt-6 text-sm text-paper/80">
          {story.name} · {story.role}
        </figcaption>
      </figure>
    </section>
  )
}

export function HostClose() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-20 md:flex-row md:items-end md:justify-between md:px-8 md:pb-28">
      <h2 className="max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
        List the car that sits still all week.
      </h2>
      <div className="flex gap-3">
        <Button nativeButton={false} render={<Link href="/become-host" />} size="lg">
          List your car
        </Button>
        <Button nativeButton={false} render={<Link href="/search" />} variant="outline" size="lg">
          Find a car
        </Button>
      </div>
    </section>
  )
}
