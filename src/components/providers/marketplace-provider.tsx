"use client"

/**
 * What: shared prototype state for favorites, trips, and host availability.
 * Why: booking on one screen has to show up on the renter dashboard, and
 *      host toggles have to stick while you move between pages.
 * Related: src/data/bookings.ts, src/components/booking/booking-screen.tsx
 */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import {
  hostFleetIds,
  seedTrips,
  type Trip,
} from "@/data/bookings"
import type { ProtectionPlanId } from "@/lib/pricing"

type MarketplaceContextValue = {
  savedIds: string[]
  toggleSaved: (id: string) => void
  isSaved: (id: string) => boolean
  trips: Trip[]
  addTrip: (trip: Omit<Trip, "id" | "status" | "renterName"> & {
    protectionId: ProtectionPlanId
  }) => Trip
  availability: Record<string, boolean>
  setAvailable: (id: string, available: boolean) => void
}

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null)

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(["tesla-model-y-2023"])
  const [trips, setTrips] = useState<Trip[]>(seedTrips)
  const [availability, setAvailability] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        hostFleetIds.map((id) => [id, id !== "jeep-wrangler-4xe-2021"])
      )
  )

  const value = useMemo<MarketplaceContextValue>(
    () => ({
      savedIds,
      isSaved: (id) => savedIds.includes(id),
      toggleSaved: (id) => {
        setSavedIds((current) =>
          current.includes(id)
            ? current.filter((item) => item !== id)
            : [...current, id]
        )
      },
      trips,
      addTrip: (trip) => {
        const created: Trip = {
          ...trip,
          id: `SYC-${18460 + trips.length}`,
          status: "Confirmed",
          renterName: "Alex Rivera",
        }
        setTrips((current) => [created, ...current])
        return created
      },
      availability,
      setAvailable: (id, available) => {
        setAvailability((current) => ({ ...current, [id]: available }))
      },
    }),
    [availability, savedIds, trips]
  )

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  )
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext)
  if (!context) {
    throw new Error("useMarketplace must be used inside MarketplaceProvider")
  }
  return context
}
