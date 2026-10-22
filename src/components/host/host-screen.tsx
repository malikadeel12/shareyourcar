"use client"

/**
 * What changed: earnings open as a black poster, and each car is a photo row.
 * Why: three equal metric cards looked like a generic dashboard.
 * Related: src/data/bookings.ts, src/components/motion/number-ticker.tsx
 * Note: MCP Context 7 — same numbers, same availability switch, clearer hierarchy.
 * Business rule: a car marked Calendar Blocked cannot be requested until
 *                the host turns availability back on. The payout card does not move money.
 */

/**
 * What: host dashboard with earnings, fleet toggles, and payout status.
 * Why: a host decides whether a car is bookable and when they get paid.
 * Related: src/data/bookings.ts
 */

import Image from "next/image"

import { hostFleetIds, hostMetrics } from "@/data/bookings"
import { NumberTicker } from "@/components/motion/number-ticker"
import { Reveal } from "@/components/motion/reveal"
import { useMarketplace } from "@/components/providers/marketplace-provider"
import { Switch } from "@/components/ui/switch"
import { getVehicle } from "@/data/vehicles"
import { formatMoney } from "@/lib/format"

export function HostScreen() {
  const { availability, setAvailable } = useMarketplace()

  return (
    <div className="pb-24">
      {/* --- Earnings poster --- */}
      {/* Ink on purpose: this is the host's number, the same pause the home page uses. */}
      <section className="bg-ink text-paper">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-14 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.22em] text-paper/60 uppercase">
              Host tools
            </p>
            <Reveal>
              <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-paper md:text-7xl">
                Your fleet
              </h1>
            </Reveal>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/75">
              Listing is free. You set the price, the calendar, and which requests
              to accept. The same tools cover one car or a small fleet: weekly and
              monthly demand, verification, and payouts. Payouts are shown here as
              a prototype of Stripe.
            </p>
          </div>

          <div className="grid gap-8 border-t border-paper/15 pt-8 md:grid-cols-3">
            <Metric label="Monthly earnings" value={hostMetrics.monthlyEarnings} prefix="$" />
            <Metric label="Active rentals" value={hostMetrics.activeRentals} />
            <Metric label="Response rate" value={hostMetrics.responseRate} suffix="%" />
          </div>

          <div>
            <p className="text-xs tracking-[0.18em] text-paper/60 uppercase">
              Earnings this season
            </p>
            <Sparkline values={hostMetrics.sparkline} />
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-12 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Cars you list
          </p>
          <div className="mt-4">
            {hostFleetIds.map((id) => {
              const vehicle = getVehicle(id)
              if (!vehicle) return null
              const available = availability[id] ?? false
              return (
                <article key={id} className="grid gap-5 border-t border-border py-6 md:grid-cols-[11rem_1fr]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <Image src={vehicle.images[0]} alt="" fill sizes="176px" className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-3xl tracking-[-0.03em]">{vehicle.title}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {vehicle.location} · {formatMoney(vehicle.pricePerDay)}/day
                        </p>
                      </div>
                      <Switch
                        checked={available}
                        onCheckedChange={(checked) => setAvailable(id, checked)}
                        aria-label={`${vehicle.title} availability`}
                      />
                    </div>
                    <p className="text-sm">
                      {available ? "Available for Rent" : "Calendar Blocked"}
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {available
                          ? "Renters can request these dates."
                          : "Requests stay closed until you reopen the calendar."}
                      </span>
                    </p>
                    <MiniCalendar blocked={!available} />
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* --- Payout slip --- */}
        {/* Shown as a pending amount. Nothing here charges or pays a host. */}
        <aside className="h-fit border-t border-border pt-6 lg:col-span-4 lg:border-t-0 lg:pt-0">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Stripe · {hostMetrics.payoutStatus}
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-0.03em]">Next payout</h2>
          <p className="mt-4 font-serif text-6xl tracking-tight">
            {formatMoney(hostMetrics.nextPayout)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Pending</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Hosts are paid after a trip ends, subject to payment processing
            and dispute review. This card does not move money.
          </p>
        </aside>
      </section>
    </div>
  )
}

function Metric({
  label,
  value,
  prefix = "",
  suffix = "",
}: {
  label: string
  value: number
  prefix?: string
  suffix?: string
}) {
  return (
    <div>
      <p className="text-xs tracking-[0.18em] text-paper/60 uppercase">{label}</p>
      <p className="mt-2 font-serif text-5xl tracking-tight md:text-6xl">
        <NumberTicker value={value} prefix={prefix} />
        {suffix}
      </p>
    </div>
  )
}

function Sparkline({ values }: { values: number[] }) {
  const min = Math.min(...values)
  const max = Math.max(...values)
  const width = 320
  const height = 96
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width
      const y = height - ((value - min) / (max - min || 1)) * (height - 12) - 6
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="mt-4 h-28 w-full text-paper"
      role="img"
      aria-label="Earnings rising across the recent months"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  )
}

function MiniCalendar({ blocked }: { blocked: boolean }) {
  const start = new Date(2026, 9, 20)
  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })

  return (
    <div>
      <p className="mb-2 text-xs tracking-[0.14em] text-muted-foreground uppercase">
        Next 14 days
      </p>
      <ol className="grid grid-cols-7 gap-1">
        {days.map((date) => (
          <li
            key={date.toISOString()}
            className={
              blocked
                ? "rounded-lg border border-border px-1 py-2 text-center text-xs text-muted-foreground line-through"
                : "rounded-lg bg-accent px-1 py-2 text-center text-xs"
            }
          >
            <span className="sr-only">
              {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
              {blocked ? ", blocked" : ", open"}
            </span>
            <span aria-hidden>{date.getDate()}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
