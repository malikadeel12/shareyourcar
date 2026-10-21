/**
 * What: trip price math for the booking breakdown.
 * Why: checkout has to update live as dates or protection change.
 * Related: src/data/vehicles.ts, src/components/booking/booking-screen.tsx
 * Standard: plain functions, no hidden fees — matches the site's
 *           "transparent pricing" promise. Context7 was used for the
 *           surrounding Next.js app structure, not for this math.
 */

import { parseISODate } from "@/lib/format"

export const SERVICE_FEE_RATE = 0.1

export type ProtectionPlanId = "bonzah-basic" | "roamly-full"

export type ProtectionPlan = {
  id: ProtectionPlanId
  name: string
  provider: string
  pricePerDay: number
  summary: string
  includes: string[]
}

/**
 * Business rule: Share Your Car is not an insurer. Trip protection at
 * checkout is optional third-party coverage. Bonzah is the licensed
 * broker of record on shareyourcar.us. Roamly is the fuller daily plan
 * offered in this prototype's checkout, at the price the product brief set.
 */
export const protectionPlans: ProtectionPlan[] = [
  {
    id: "bonzah-basic",
    provider: "Bonzah",
    name: "Bonzah Basic Renter Protection",
    pricePerDay: 15,
    summary:
      "Collision Damage Waiver for physical damage to the rental vehicle when there is an accident with another vehicle.",
    includes: [
      "Licensed broker of record: Bonzah",
      "Runs in 24-hour cycles from scheduled pickup",
      "Drivers must be 21+ and listed on the agreement",
    ],
  },
  {
    id: "roamly-full",
    provider: "Roamly",
    name: "Roamly Host Insurance Full Coverage",
    pricePerDay: 25,
    summary:
      "Fuller trip protection at checkout, for renters who want more than the basic collision waiver on an eligible vehicle.",
    includes: [
      "Daily plan, priced for the whole trip",
      "Shown with the same line-item breakdown as Basic",
      "Policy terms are confirmed before purchase",
    ],
  },
]

export function tripDays(from: string, to: string) {
  const ms = parseISODate(to).getTime() - parseISODate(from).getTime()
  const days = Math.round(ms / 86_400_000)
  // A same-day handoff still uses the car, so the minimum quote is one day.
  return Math.max(1, days)
}

export function quoteTrip(input: {
  pricePerDay: number
  from: string
  to: string
  protectionId: ProtectionPlanId
}) {
  const days = tripDays(input.from, input.to)
  const daily = input.pricePerDay * days
  const plan =
    protectionPlans.find((item) => item.id === input.protectionId) ??
    protectionPlans[0]
  const protection = plan.pricePerDay * days
  const serviceFee = Math.round(daily * SERVICE_FEE_RATE)
  return {
    days,
    daily,
    protection,
    protectionName: plan.name,
    serviceFee,
    total: daily + protection + serviceFee,
  }
}
