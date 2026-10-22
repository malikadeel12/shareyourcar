"use client"

/**
 * What changed: results render as stacked lookbook rows.
 * Why: the search page should feel like the rest of the brand, not a card grid.
 * Related: src/components/home/vehicle-card.tsx, src/components/search/search-screen.tsx
 * Note: MCP Context 7 — one list, one empty state, no extra layout modes.
 */

/**
 * What: filtered vehicle list with a short skeleton while results settle.
 * Why: search should feel like a catalog loading, not an empty jump.
 * Related: src/components/home/vehicle-card.tsx
 */

import { useEffect, useState } from "react"

import { Reveal } from "@/components/motion/reveal"
import { VehicleCard } from "@/components/home/vehicle-card"
import { Skeleton } from "@/components/ui/skeleton"
import { filterVehicles, type Vehicle } from "@/data/vehicles"

type VehicleGridProps = {
  location?: string
  category?: string
  price?: number
  seats?: number
  fuel?: string
  from?: string
  to?: string
  pause?: boolean
  /** Recommended keeps the catalog order. The other sorts use price or the car's rating. */
  sort?: "recommended" | "price-asc" | "price-desc" | "rating"
}

export function VehicleGrid({
  location,
  category,
  price,
  seats,
  fuel,
  from,
  to,
  pause = false,
  sort = "recommended",
}: VehicleGridProps) {
  const [loading, setLoading] = useState(pause)
  const vehicles = filterVehicles({ location, category, price, seats, fuel }).slice()
  // --- Sort ---
  // Recommended is the order the cars are listed. Price and rating reorder that same list.
  if (sort === "price-asc") vehicles.sort((a, b) => a.pricePerDay - b.pricePerDay)
  if (sort === "price-desc") vehicles.sort((a, b) => b.pricePerDay - a.pricePerDay)
  if (sort === "rating") vehicles.sort((a, b) => b.rating - a.rating)

  useEffect(() => {
    if (!pause) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const timer = window.setTimeout(() => setLoading(false), reduce ? 0 : 360)
    return () => window.clearTimeout(timer)
  }, [pause])

  if (loading) {
    return (
      <div className="flex flex-col gap-8" aria-busy="true" aria-live="polite">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="grid gap-4 md:grid-cols-12">
            <Skeleton className="aspect-[16/10] rounded-3xl md:col-span-7" />
            <div className="flex flex-col justify-center gap-3 md:col-span-5">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-4/5" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (vehicles.length === 0) {
    return (
      <div className="border-t border-border py-16">
        <p className="font-serif text-4xl tracking-[-0.03em]">No cars for that filter</p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          The catalog is six cars. Clear the price, fuel, or city and they come back.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {vehicles.map((vehicle: Vehicle, index) => (
        <Reveal key={vehicle.id} index={index}>
          <VehicleCard vehicle={vehicle} from={from} to={to} row />
        </Reveal>
      ))}
    </div>
  )
}
