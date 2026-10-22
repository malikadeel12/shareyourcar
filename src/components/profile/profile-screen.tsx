"use client"

/**
 * What: the signed-in renter profile.
 * Why: the mobile nav needs a place for identity, saved cars, and theme.
 * Related: src/components/providers/marketplace-provider.tsx
 */

import Link from "next/link"

import { ThemeToggle } from "@/components/layout/theme-toggle"
import { useMarketplace } from "@/components/providers/marketplace-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { renterName } from "@/data/bookings"
import { getVehicle } from "@/data/vehicles"

export function ProfileScreen() {
  const { savedIds } = useMarketplace()

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 md:px-8 md:py-12">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
        Profile
      </p>
      <h1 className="font-serif text-5xl tracking-[-0.04em] md:text-7xl">
        {renterName}
      </h1>
      <Badge variant="success" className="h-auto w-fit px-3 py-1">
        Identity verification via Stripe / Persona
      </Badge>
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Light is the default. Dark flips the black buttons to paper.</CardDescription>
          <ThemeToggle />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Saved cars</CardTitle>
          <CardDescription>
            {savedIds.length === 0
              ? "Hearts on the catalog stay on this profile."
              : savedIds
                  .map((id) => getVehicle(id)?.title)
                  .filter(Boolean)
                  .join(", ")}
          </CardDescription>
          <Button nativeButton={false} render={<Link href="/favorites" />} variant="outline" className="mt-3 w-fit">
            See saved cars
          </Button>
        </CardHeader>
      </Card>
      <div className="flex gap-2">
        <Button nativeButton={false} render={<Link href="/trips" />}>
          Trips
        </Button>
        <Button nativeButton={false} render={<Link href="/host" />} variant="outline">
          Host dashboard
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Trip support is open daily, 8 AM–8 PM ET. Write to support@shareyourcar.us.
      </p>
    </section>
  )
}
