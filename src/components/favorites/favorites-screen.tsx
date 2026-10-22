"use client"

/**
 * What: the saved cars, with the same photos as search.
 * Why: the heart only left a list of names on Profile. The live Favorites
 *      link had no page of its own.
 * Related: src/components/providers/marketplace-provider.tsx, src/components/home/vehicle-card.tsx
 * Note: MCP Context 7 — reuse the car card. A refresh clears the hearts.
 */

import Link from "next/link"

import { VehicleCard } from "@/components/home/vehicle-card"
import { useMarketplace } from "@/components/providers/marketplace-provider"
import { Button } from "@/components/ui/button"
import { getVehicle, sampleTrip } from "@/data/vehicles"

export function FavoritesScreen() {
  const { savedIds } = useMarketplace()
  const saved = savedIds
    .map((id) => getVehicle(id))
    .filter((vehicle) => vehicle !== undefined)

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 pb-28 md:px-8 md:py-16">
      <div className="max-w-3xl">
        <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">Favorites</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-[-0.04em] md:text-7xl">
          Saved cars
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          {saved.length === 0
            ? "Nothing saved yet."
            : `${saved.length} ${saved.length === 1 ? "car" : "cars"} saved on this browser.`}
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="border-t border-border py-16">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Tap the heart on a car in Inventory. It stays here until you refresh.
          </p>
          <Button nativeButton={false} render={<Link href="/search" />} className="mt-6">
            Browse cars
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {saved.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              from={sampleTrip.from}
              to={sampleTrip.to}
              row
            />
          ))}
        </div>
      )}
    </section>
  )
}
