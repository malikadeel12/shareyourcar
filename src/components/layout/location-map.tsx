"use client"

/**
 * What changed: a location map now sits just above the footer.
 * Why: the live site shows where cars are before the footer. This version
 *      keeps that idea and uses only the cities that actually have a car.
 * Related: src/data/vehicles.ts, src/components/layout/app-shell.tsx
 * Note: MCP Context 7 — one map, two real stops, no extra hub cities.
 * Business rule: counts come from the listed catalog. New York has the
 *                five cars. Albany, Georgia has the one Jeep. Do not add
 *                the live site's "140+ vehicles" lines.
 */

import { useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { listedStops, sampleTrip } from "@/data/vehicles"
import { searchHref } from "@/lib/search"
import { cn } from "@/lib/utils"

/** The same map points the live page opens, limited to cities we list. */
const points: Record<string, { lat: number; lng: number; zoom: number }> = {
  "New York, New York": { lat: 40.758, lng: -73.9855, zoom: 11 },
  "Albany, Georgia": { lat: 31.5785, lng: -84.1557, zoom: 12 },
}

export function LocationMap() {
  const stops = listedStops()
  const [active, setActive] = useState(stops[0]?.city ?? "New York, New York")
  const place = points[active] ?? points["New York, New York"]
  const selected = stops.find((stop) => stop.city === active) ?? stops[0]
  const mapSrc = `https://maps.google.com/maps?q=${place.lat},${place.lng}&z=${place.zoom}&output=embed`

  return (
    <section aria-labelledby="location-map-title" className="border-t border-border">
      <div className="mx-auto grid w-full max-w-7xl items-stretch gap-8 px-4 py-16 md:px-8 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
              Where the cars are
            </p>
            <h2
              id="location-map-title"
              className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em]"
            >
              Car rental locations
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Pick a city. The map moves with it. These are the only places with a car listed.
            </p>
          </div>

          {/* --- City list --- */}
          <ul className="flex flex-col">
            {stops.map((stop) => {
              const on = stop.city === active
              return (
                <li key={stop.city} className="border-t border-border">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(stop.city)}
                    className={cn(
                      "flex w-full flex-col items-start gap-1 py-4 text-left",
                      on ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span className="font-serif text-2xl tracking-[-0.03em]">{stop.city}</span>
                    <span className="text-sm">
                      {stop.count} {stop.count === 1 ? "car" : "cars"} listed
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {selected ? (
            <div>
              <Button
                nativeButton={false}
                render={
                  <Link
                    href={searchHref({
                      where: selected.city,
                      from: sampleTrip.from,
                      to: sampleTrip.to,
                    })}
                  />
                }
              >
                Browse vehicles in {selected.city.split(",")[0]}
              </Button>
            </div>
          ) : null}
        </div>

        {/* The frame stays cream and black. The map itself is the live place, not a drawing. */}
        <div className="min-h-[24rem] overflow-hidden rounded-3xl border border-border bg-muted lg:col-span-8 lg:min-h-[32rem]">
          <iframe
            key={active}
            title={`Map of cars listed in ${active}`}
            src={mapSrc}
            className="h-full min-h-[24rem] w-full grayscale lg:min-h-[32rem]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
