/**
 * What: starter trips and host metrics for the two dashboards.
 * Why: the renter and host screens need realistic records before anyone books.
 * Related: src/components/providers/marketplace-provider.tsx
 */

export type TripStatus = "Confirmed" | "In Progress" | "Completed"

export type Trip = {
  id: string
  vehicleId: string
  from: string
  to: string
  protectionId: "bonzah-basic" | "roamly-full"
  status: TripStatus
  renterName: string
}

export const renterName = "Alex Rivera"

export const seedTrips: Trip[] = [
  {
    id: "SYC-18420",
    vehicleId: "tesla-model-3-2023",
    from: "2026-10-18",
    to: "2026-10-22",
    protectionId: "bonzah-basic",
    status: "In Progress",
    renterName,
  },
  {
    id: "SYC-18455",
    vehicleId: "tesla-model-s-2024",
    from: "2026-10-28",
    to: "2026-10-31",
    protectionId: "roamly-full",
    status: "Confirmed",
    renterName,
  },
  {
    id: "SYC-17902",
    vehicleId: "jeep-wrangler-2021",
    from: "2026-09-04",
    to: "2026-09-07",
    protectionId: "bonzah-basic",
    status: "Completed",
    renterName,
  },
]

/** Cars this signed-in host can toggle. The rest of the catalog belongs to other hosts. */
export const hostFleetIds = [
  "tesla-model-s-2024",
  "tesla-model-3-2023",
  "jeep-wrangler-4xe-2021",
  "tesla-model-y-2023",
]

export const hostMetrics = {
  monthlyEarnings: 2450,
  activeRentals: 3,
  responseRate: 98,
  nextPayout: 850,
  payoutStatus: "Connected" as const,
  sparkline: [820, 640, 910, 1200, 980, 1450, 1680, 2100, 1900, 2450],
}

export const hostStories = [
  {
    name: "Sarah M.",
    role: "Guest · Phoenix, AZ",
    quote:
      "Booking was straightforward and the host was responsive. The car was exactly as described — I'll use Share Your Car again for my next trip.",
  },
  {
    name: "Marcus T.",
    role: "Host · Dallas, TX",
    quote:
      "Listing my SUV was free and the dashboard makes it easy to manage requests. Transparent payouts and clear trip details build trust with renters.",
  },
  {
    name: "James K.",
    role: "Host · Denver, CO",
    quote:
      "I host two vehicles part-time. Share Your Car fits around my schedule, and guests are verified before I approve a trip.",
  },
]

export const bookingSteps = [
  {
    title: "Choose your car",
    body: "Search by location, dates, and vehicle type to find the perfect match.",
  },
  {
    title: "Book instantly",
    body: "Confirm your trip online with secure checkout and instant confirmation.",
  },
  {
    title: "Pick up the vehicle",
    body: "Meet your host, verify details, and start your trip with confidence.",
  },
  {
    title: "Enjoy your ride",
    body: "Drive on your schedule and return the vehicle when your trip ends.",
  },
]
