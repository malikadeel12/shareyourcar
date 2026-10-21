/**
 * What: homepage copy taken from shareyourcar.us.
 * Why: the longer page should use the live site's audiences, earnings,
 *      and FAQ, written as a brand story rather than a short catalog.
 * Related: src/components/home/home-screen.tsx
 */

export const cities = [
  "New York",
  "Albany",
  "Los Angeles",
  "Miami",
  "Phoenix",
  "Dallas",
  "Denver",
  "Las Vegas",
]

export const audiences = [
  {
    title: "Traveling professionals",
    body: "Nurses, doctors, contractors, utility crews, and corporate travelers who need a reliable car while they are in town.",
  },
  {
    title: "Military personnel",
    body: "Transportation during relocation, training assignments, deployment transitions, and temporary duty.",
  },
  {
    title: "Airport and business travelers",
    body: "A car near the airport without waiting at a traditional rental counter.",
  },
  {
    title: "Families and everyday drivers",
    body: "Vacations, a car in the shop, an insurance-claim gap, or a family visit.",
  },
  {
    title: "Students and interns",
    body: "Short-term transportation during an internship or a move.",
  },
  {
    title: "Tourists and visitors",
    body: "Daily, weekly, and monthly rentals for a city and the roads around it.",
  },
]

/** Business rule: these are the host-page averages for someone who shares a car about 15 days a month. Actual earnings vary by vehicle, city, and demand. */
export const cityEarnings = [
  { city: "Los Angeles", amount: 1240 },
  { city: "Miami", amount: 980 },
  { city: "Phoenix", amount: 720 },
  { city: "Dallas", amount: 650 },
  { city: "Denver", amount: 580 },
]

export const faqs = [
  {
    question: "How do I unlock the car?",
    answer:
      "Vehicle access instructions are provided before pickup or in the booking dashboard. Some vehicles support app-based or remote access.",
  },
  {
    question: "What happens if I have an accident?",
    answer:
      "Contact Share Your Car support immediately and document the incident with photos and details. Protection plans, approved personal coverage, or third-party coverage may apply depending on the option you selected. Exclusions and financial responsibility amounts still apply. Share Your Car does not underwrite coverage. Bonzah is the licensed broker.",
  },
  {
    question: "Can I extend my trip?",
    answer:
      "You can request an extension before the reservation ends. It depends on the car still being free, and on the host approving the extra days.",
  },
  {
    question: "How do I cancel a booking?",
    answer:
      "Cancellation eligibility and any refund depend on when you cancel and on the cancellation policy for that trip.",
  },
  {
    question: "What if the car breaks down?",
    answer:
      "Contact Share Your Car support immediately. Trip support is open daily, 8 AM–8 PM ET, and urgent issues are prioritized. The team helps with next steps and roadside guidance when it is available.",
  },
  {
    question: "How do I become a host?",
    answer:
      "Create a host account, complete identity verification, verify that you own the vehicle, and upload photos, registration, and proof of insurance. The car has to meet safety standards, and you sign the host agreement. Confirm with your insurer that peer-to-peer sharing is allowed. Commercial or fleet coverage may be required.",
  },
]
