"use client"

/**
 * What: a numbered horizontal reel of the live inventory.
 * Why: the real site opens on featured rides. A filmstrip gives those
 *      cars a stage before the filterable grid.
 * Related: src/data/vehicles.ts
 */

import Image from "next/image"
import Link from "next/link"

import { sampleTrip, vehicles } from "@/data/vehicles"
import { formatMoney } from "@/lib/format"
import { bookHref } from "@/lib/search"

export function Filmstrip() {
  return (
    <section className="overflow-x-clip py-14 md:py-20" aria-labelledby="featured-rides">
      <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-4 md:px-8">
        <div>
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
            Featured rides
          </p>
          <h2 id="featured-rides" className="mt-2 font-serif text-5xl tracking-[-0.04em] md:text-7xl">
            Six cars, ready now
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm text-muted-foreground md:block">
          The same inventory on Share Your Car today. Swipe the row, then book the one that fits the trip.
        </p>
      </div>
      <div className="mt-8 flex min-w-0 gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory md:px-8">
        {vehicles.map((vehicle, index) => (
          <Link
            key={vehicle.id}
            href={bookHref(vehicle.id, sampleTrip.from, sampleTrip.to)}
            className="w-[78vw] shrink-0 snap-start rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:w-[26rem]"
          >
            <div className="relative aspect-[16/11] overflow-hidden rounded-3xl bg-muted">
              <Image
                src={vehicle.images[0]}
                alt=""
                fill
                sizes="(max-width: 768px) 78vw, 416px"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 rounded-full bg-ink/75 px-3 py-1 font-serif text-2xl text-paper">
                0{index + 1}
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3 px-1">
              <h3 className="text-lg font-semibold tracking-tight">{vehicle.title}</h3>
              <p className="shrink-0 text-sm">
                {formatMoney(vehicle.pricePerDay)}
                <span className="text-muted-foreground">/day</span>
              </p>
            </div>
            <p className="px-1 text-sm text-muted-foreground">{vehicle.location}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
