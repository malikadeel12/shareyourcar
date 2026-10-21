/**
 * What: typed mock inventory copied from the live Share Your Car catalog.
 * Why: the prototype should name the same cars, cities, and daily rates
 *      a visitor sees on shareyourcar.us/inventory.
 * Related: src/lib/pricing.ts, src/components/home/vehicle-card.tsx
 */

export type VehicleCategory = "SUV" | "Sedan" | "Electric" | "Luxury"

export type Host = {
  id: string
  name: string
  city: string
  verified: boolean
  responseRate: number
  memberSince: string
  initials: string
}

export type Vehicle = {
  id: string
  year: number
  make: string
  model: string
  title: string
  location: string
  seats: number
  transmission: "automatic"
  fuel: "Electric" | "gasoline"
  pricePerDay: number
  categories: VehicleCategory[]
  tags: string[]
  features: string[]
  description: string
  images: string[]
  host: Host
  rating: number
  trips: number
  instantBook: boolean
}

export const categories = ["All", "SUV", "Sedan", "Electric", "Luxury"] as const
export type CategoryFilter = (typeof categories)[number]

export const pickupLocations = [
  "Nearby",
  "New York, New York",
  "Albany, Georgia",
  "Los Angeles, California",
  "Miami, Florida",
  "Phoenix, Arizona",
  "Dallas, Texas",
  "Denver, Colorado",
  "Las Vegas, Nevada",
] as const

/** A Friday-to-Monday sample, which quotes as 3 days. */
export const sampleTrip = {
  from: "2026-10-24",
  to: "2026-10-27",
} as const

function photo(id: string, crop = "entropy") {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=${crop}&w=1800&q=80`
}

const maya: Host = {
  id: "host-maya",
  name: "Maya Chen",
  city: "New York, New York",
  verified: true,
  responseRate: 98,
  memberSince: "2026",
  initials: "MC",
}

const james: Host = {
  id: "host-james",
  name: "James R.",
  city: "Albany, Georgia",
  verified: true,
  responseRate: 96,
  memberSince: "2026",
  initials: "JR",
}

const marcus: Host = {
  id: "host-marcus",
  name: "Marcus T.",
  city: "New York, New York",
  verified: true,
  responseRate: 99,
  memberSince: "2026",
  initials: "MT",
}

export const vehicles: Vehicle[] = [
  {
    id: "tesla-model-s-2024",
    year: 2024,
    make: "Tesla",
    model: "Model S",
    title: "2024 Tesla Model S",
    location: "New York, New York",
    seats: 5,
    transmission: "automatic",
    fuel: "Electric",
    pricePerDay: 50,
    categories: ["Sedan", "Electric", "Luxury"],
    tags: ["Keyless", "EV"],
    features: ["Keyless entry", "Five seats", "Automatic", "Electric"],
    description:
      "Discover the 2024 Tesla Model S in New York. Book from $50/day with a trusted host, flexible dates, and instant booking when the car is free.",
    images: [
      photo("1536700503339-1e4b06520771"),
      photo("1536700503339-1e4b06520771", "left"),
    ],
    host: maya,
    rating: 4.9,
    trips: 18,
    instantBook: true,
  },
  {
    id: "jeep-wrangler-2021",
    year: 2021,
    make: "Jeep",
    model: "Wrangler",
    title: "2021 Jeep Wrangler",
    location: "New York, New York",
    seats: 5,
    transmission: "automatic",
    fuel: "gasoline",
    pricePerDay: 50,
    categories: ["SUV"],
    tags: ["gasoline"],
    features: ["Five seats", "Automatic", "Removable top"],
    description:
      "A 2021 Jeep Wrangler in New York for weekends out of the city. Five seats, automatic, and a host who answers the same day.",
    images: [
      photo("1640021042546-2a1b900f324b"),
      photo("1595392004747-3d9b64a4b013"),
    ],
    host: marcus,
    rating: 4.8,
    trips: 11,
    instantBook: false,
  },
  {
    id: "tesla-model-3-2023",
    year: 2023,
    make: "Tesla",
    model: "Model 3",
    title: "2023 Tesla Model 3",
    location: "New York, New York",
    seats: 5,
    transmission: "automatic",
    fuel: "Electric",
    pricePerDay: 50,
    categories: ["Sedan", "Electric"],
    tags: ["EV"],
    features: ["Five seats", "Automatic", "Electric"],
    description:
      "A 2023 Tesla Model 3 for daily driving in New York. Quiet, easy to park, and listed from $50/day.",
    images: [
      photo("1560958089-b8a1929cea89"),
      photo("1560958089-b8a1929cea89", "right"),
    ],
    host: maya,
    rating: 5,
    trips: 24,
    instantBook: true,
  },
  {
    id: "tesla-model-y-2023",
    year: 2023,
    make: "Tesla",
    model: "Model Y",
    title: "2023 Tesla Model Y",
    location: "New York, New York",
    seats: 5,
    transmission: "automatic",
    fuel: "Electric",
    pricePerDay: 50,
    categories: ["SUV", "Electric"],
    tags: ["Keyless", "EV"],
    features: ["Keyless entry", "Five seats", "Automatic", "Electric"],
    description:
      "The 2023 Tesla Model Y is the practical New York pick: five seats, keyless pickup, and a daily rate from $50.",
    images: [
      photo("1600661653561-629509216228"),
      photo("1696448415543-e65da83c6b6e"),
    ],
    host: marcus,
    rating: 4.9,
    trips: 15,
    instantBook: true,
  },
  {
    id: "jeep-wrangler-4xe-2021",
    year: 2021,
    make: "Jeep",
    model: "Wrangler 4xe",
    title: "2021 Jeep Wrangler 4xe",
    location: "Albany, Georgia",
    seats: 5,
    transmission: "automatic",
    fuel: "gasoline",
    pricePerDay: 105,
    categories: ["SUV"],
    tags: ["Keyless", "gasoline"],
    features: [
      "All-wheel drive",
      "Apple CarPlay",
      "Android Auto",
      "Backup camera",
      "AUX input",
    ],
    description:
      "This 2021 Jeep Wrangler 4xe pairs off-road capability with plug-in hybrid driving. Ready for a road trip, a trail, or a week around Albany.",
    images: [
      photo("1595392004747-3d9b64a4b013"),
      photo("1640021042546-2a1b900f324b"),
    ],
    host: james,
    rating: 4.7,
    trips: 6,
    instantBook: false,
  },
  {
    id: "tesla-model-x-2024",
    year: 2024,
    make: "Tesla",
    model: "Model X",
    title: "2024 Tesla Model X",
    location: "New York, New York",
    seats: 5,
    transmission: "automatic",
    fuel: "Electric",
    pricePerDay: 50,
    categories: ["SUV", "Electric", "Luxury"],
    tags: ["EV"],
    features: ["Falcon-wing doors", "Five seats", "Automatic", "Electric"],
    description:
      "A 2024 Tesla Model X in New York for airport runs and family days. Falcon-wing doors, five seats, from $50/day.",
    images: [
      photo("1652508996643-2fc140eebe1d"),
      photo("1587304878428-1b533030e0e7"),
    ],
    host: maya,
    rating: 4.9,
    trips: 9,
    instantBook: true,
  },
]

export function getVehicle(id: string) {
  return vehicles.find((vehicle) => vehicle.id === id)
}

/** Cities that actually have a listed car. Counts come from the catalog, not from hub claims. */
export function listedStops() {
  const counts = new Map<string, number>()
  for (const vehicle of vehicles) {
    counts.set(vehicle.location, (counts.get(vehicle.location) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
}

export function filterVehicles(input: {
  location?: string
  category?: string
  price?: number
  seats?: number
  fuel?: string
}) {
  return vehicles.filter((vehicle) => {
    const location = input.location?.trim()
    const locationOk =
      !location ||
      location === "Nearby" ||
      vehicle.location.toLowerCase().includes(location.toLowerCase())
    const categoryOk =
      !input.category ||
      input.category === "All" ||
      vehicle.categories.includes(input.category as VehicleCategory)
    // Price, seats, and fuel are the extra search filters. A blank value means "any".
    const priceOk = !input.price || vehicle.pricePerDay === input.price
    const seatsOk = !input.seats || vehicle.seats === input.seats
    const fuelOk = !input.fuel || input.fuel === "Any" || vehicle.fuel === input.fuel
    return locationOk && categoryOk && priceOk && seatsOk && fuelOk
  })
}
