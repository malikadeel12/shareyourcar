"use client"

/**
 * What changed: search results can render as a wide photo row, not only a tile.
 * Why: six equal cards looked like a template. A lookbook row matches the home page.
 * Related: src/components/home/vehicle-grid.tsx, src/components/search/search-screen.tsx
 * Note: layout follows the existing cream and ink brand. MCP Context 7: keep the
 *       component small and reuse the same photo, save, and booking link.
 */

/**
 * What: one vehicle in the marketplace catalog.
 * Why: the photo, daily rate, and trust badges are what a renter compares.
 * Related: src/data/vehicles.ts, src/app/book/[vehicleId]/page.tsx
 */

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ViewTransition } from "react"
import { BadgeCheck, Heart, MapPin, ShieldCheck } from "lucide-react"

import { useMarketplace } from "@/components/providers/marketplace-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Vehicle } from "@/data/vehicles"
import { formatMoney } from "@/lib/format"
import { bookHref } from "@/lib/search"
import { cn } from "cn"

type VehicleCardProps = {
  vehicle: Vehicle
  from?: string
  to?: string
  /** Wide row for the search lookbook. The tile is the compact fallback. */
  row?: boolean
}

export function VehicleCard({ vehicle, from, to, row = false }: VehicleCardProps) {
  const router = useRouter()
  const { isSaved, toggleSaved } = useMarketplace()
  const saved = isSaved(vehicle.id)
  const [index, setIndex] = useState(0)
  const startX = useRef(0)
  const dragged = useRef(false)
  const href = bookHref(vehicle.id, from, to)

  function step(direction: number) {
    setIndex((current) => {
      const next = current + direction
      if (next < 0) return vehicle.images.length - 1
      if (next >= vehicle.images.length) return 0
      return next
    })
  }

  const media = (
    <div className="relative h-full">
      <button
        type="button"
        className="block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={`View ${vehicle.title}`}
        onTouchStart={(event) => {
          startX.current = event.changedTouches[0]?.clientX ?? 0
          dragged.current = false
        }}
        onTouchEnd={(event) => {
          const endX = event.changedTouches[0]?.clientX ?? 0
          const delta = endX - startX.current
          if (Math.abs(delta) > 36) {
            dragged.current = true
            step(delta < 0 ? 1 : -1)
          }
        }}
        onClick={() => {
          if (dragged.current) {
            dragged.current = false
            return
          }
          router.push(href)
        }}
      >
        <ViewTransition name={`car-${vehicle.id}`}>
          <div className={cn("relative overflow-hidden bg-muted", row ? "aspect-[16/10] md:aspect-auto md:h-full md:min-h-72" : "aspect-[4/3]")}>
            <Image
              src={vehicle.images[index] ?? vehicle.images[0]}
              alt=""
              fill
              sizes={row ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 33vw"}
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </ViewTransition>
      </button>
      <Button
        type="button"
        size="icon"
        variant="outline"
        aria-pressed={saved}
        aria-label={saved ? `Remove ${vehicle.title} from saved` : `Save ${vehicle.title}`}
        className="absolute top-3 right-3 bg-card"
        onClick={() => toggleSaved(vehicle.id)}
      >
        <Heart className={cn(saved && "fill-current")} />
      </Button>
      {vehicle.images.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {vehicle.images.map((image, dot) => (
            <button
              key={image + dot}
              type="button"
              aria-label={`Photo ${dot + 1} of ${vehicle.images.length}`}
              className={cn(
                "size-1.5 rounded-full bg-white/70",
                dot === index && "w-4 bg-white"
              )}
              onClick={() => setIndex(dot)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )

  const facts = (
    <>
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="h-auto px-2.5 py-1">
          <BadgeCheck data-icon="inline-start" />
          Verified Host
        </Badge>
        <Badge variant="success" className="h-auto px-2.5 py-1">
          <ShieldCheck data-icon="inline-start" />
          Insurance Included
        </Badge>
      </div>
      <CardTitle className={cn("tracking-[-0.03em]", row ? "font-serif text-4xl leading-none md:text-5xl" : "font-sans text-lg")}>
        <Link href={href} className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          {vehicle.title}
        </Link>
      </CardTitle>
      <CardDescription className="flex items-center gap-1">
        <MapPin aria-hidden className="size-3.5" />
        {vehicle.location}
        <span aria-hidden>· {vehicle.host.name}</span>
      </CardDescription>
    </>
  )

  // --- Lookbook row ---
  // Search has only a handful of cars, so each one gets a full photo instead of a small tile.
  if (row) {
    return (
      <Card className="grid overflow-hidden rounded-3xl md:grid-cols-12">
        <div className="md:col-span-7">{media}</div>
        <div className="flex flex-col justify-between gap-8 md:col-span-5">
          <CardHeader>{facts}</CardHeader>
          <CardFooter className="items-end justify-between border-0 bg-transparent">
            <p className="font-serif text-4xl tracking-tight">
              {formatMoney(vehicle.pricePerDay)}
              <span className="ml-2 font-sans text-sm font-normal text-muted-foreground">per day</span>
            </p>
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              {vehicle.seats} seats · {vehicle.fuel}
            </p>
          </CardFooter>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden rounded-2xl transition-transform active:scale-[0.97]">
      {media}
      <CardHeader>{facts}</CardHeader>
      <CardFooter className="justify-between">
        <p className="text-base font-semibold tracking-tight">
          {formatMoney(vehicle.pricePerDay)}
          <span className="text-sm font-normal text-muted-foreground">/day</span>
        </p>
        <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
          {vehicle.seats} seats · {vehicle.fuel}
        </p>
      </CardFooter>
    </Card>
  )
}
