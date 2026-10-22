/**
 * What: copy from the live About, Testimonials, Contact, and Become a host pages.
 * Why: those pages should say the same things as shareyourcar.us, in this site's layout.
 * Related: src/app/about/page.tsx, src/app/testimonials/page.tsx, src/app/contact/page.tsx, src/app/become-host/page.tsx
 * Note: the live host page also prints "250+ drivers" and "100+ vehicles".
 *       Those counts are not used here. The catalog on this prototype is six cars.
 */

export const aboutDifferences = [
  {
    title: "Same-day rentals",
    body: "Need a vehicle today? Find available cars nearby and book within minutes.",
  },
  {
    title: "App-based access",
    body: "Manage your bookings, unlock vehicles, and track trips from your phone.",
  },
  {
    title: "Tracking and mileage",
    body: "Trip monitoring and mileage logging for both renters and hosts.",
  },
  {
    title: "Transparent pricing",
    body: "No surprise charges. The daily rate is the price on the car.",
  },
  {
    title: "Vehicles from local owners",
    body: "The cars are shared by people in the community, not a rental counter.",
  },
]

export const aboutSafety = [
  "Verified renters",
  "Secure booking",
  "Trip tracking",
  "Mileage logging",
  "Optional protection plans",
]

export const testimonials = [
  {
    quote:
      "Booking was straightforward and the host was responsive. The car was exactly as described — I'll use Share Your Car again for my next trip.",
    name: "Sarah M.",
    role: "Guest · Phoenix, AZ · March 18, 2026",
  },
  {
    quote:
      "Listing my SUV was free and the dashboard makes it easy to manage requests. Transparent payouts and clear trip details build trust with renters.",
    name: "Marcus T.",
    role: "Host · Dallas, TX · April 2, 2026",
  },
  {
    quote:
      "Needed a car for a long weekend. Search, book, and pickup were smooth. Protection options at checkout were explained clearly — no surprises.",
    name: "Elena R.",
    role: "Guest · Miami, FL · May 9, 2026",
  },
  {
    quote:
      "I host two vehicles part-time. Share Your Car fits around my schedule, and guests are verified before I approve a trip.",
    name: "James K.",
    role: "Host · Denver, CO · June 1, 2026",
  },
  {
    quote:
      "Great alternative to traditional rental counters. Loved browsing local cars and supporting hosts in my area.",
    name: "Priya N.",
    role: "Guest · Los Angeles, CA · June 15, 2026",
  },
  {
    quote:
      "The platform feels modern and professional. Support answered my questions quickly when I had a calendar question.",
    name: "David L.",
    role: "Host · Las Vegas, NV · July 3, 2026",
  },
]

export const contactCategories = [
  "General Question",
  "Booking Issue",
  "Payment Problem",
  "Technical Issue",
  "Host Support",
  "Safety Concern",
] as const

export const contactFaqs = [
  {
    question: "How do I cancel my booking?",
    answer:
      "You can cancel through your trip dashboard. Cancellation depends on when you cancel and on the policy for that trip.",
  },
  {
    question: "What if I'm locked out of my account?",
    answer:
      "Use the forgot-password link on the login page, or email support@shareyourcar.us.",
  },
  {
    question: "How do I become a host?",
    answer:
      "Open Become a host to see the requirements, then use the host tools to list a car. Listing is free.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "The live site accepts major credit cards, debit cards, and PayPal. This prototype shows a card form only and does not charge it.",
  },
]

export const hostSteps = [
  {
    title: "Sign up",
    body: "Create your account and tell us about your car. It only takes a few minutes, and listing is free.",
  },
  {
    title: "Set up your profile",
    body: "Add photos, set your availability, and choose your price.",
  },
  {
    title: "Welcome your guests",
    body: "You choose which requests to accept and when the car is shared.",
  },
  {
    title: "Get back your keys",
    body: "After the trip you review the guest. Hosts are paid within 48 hours after the trip ends, subject to payment processing and dispute review.",
  },
]

export const hostPerks = [
  { title: "Earn extra income", body: "The car can earn on days it would otherwise sit still." },
  { title: "Longer trips", body: "Weekly and monthly renters are part of the same calendar." },
  { title: "Flexible pricing", body: "You set the daily rate. The cars listed today are $50 or $105 a day." },
  { title: "You choose the days", body: "Approve a request, or block the calendar." },
  { title: "Verification", body: "Drivers must be 21 or older, licensed, and listed on the agreement." },
  { title: "Your insurance", body: "Keep a valid auto policy and confirm that peer-to-peer sharing is allowed." },
  { title: "You stay in control", body: "Pricing, availability, acceptance, and house rules stay with the host." },
  { title: "Fleets welcome", body: "One owner or a small fleet uses the same host tools." },
]

export const hostRequirements = [
  "Valid driver's license",
  "Vehicle ownership verification",
  "Vehicle photos and inspection",
  "Registration verification",
  "Proof of valid vehicle insurance",
  "Insurer confirmation that peer-to-peer sharing is allowed",
  "Vehicle safety standards",
  "Signed host agreement",
]

export const hostQuotes = [
  {
    name: "Sarah M.",
    quote:
      "I've been hosting my BMW on Share Your Car and it's been fantastic. The platform is easy to use, guests are respectful, and I've earned enough to cover my car payments plus extra for my business.",
  },
  {
    name: "James R.",
    quote:
      "Sharing my cars on Share Your Car has been a game-changer. I started with one car and now have three vehicles earning income. The host tools and protection resources give me peace of mind.",
  },
]

/**
 * Guest steps from the live How it works page.
 * The live page also prints 3.2M guests and 175k hosts. Those counts are not used.
 * This catalog is six cars.
 */
export const guestSteps = [
  {
    title: "Find the car",
    body: "Six cars are listed, five in New York and one Jeep in Albany. You book the exact car in the photo.",
  },
  {
    title: "Book",
    body: "Some cars can be booked when the calendar is open. Others wait for the host. Most trips are approved within 8 hours.",
  },
  {
    title: "Pick up the keys",
    body: "Access instructions arrive before pickup. Some cars are keyless. Every driver must be listed on the agreement.",
  },
  {
    title: "Drive and return",
    body: "Protection is chosen at checkout. Bring the car back when the trip ends.",
  },
]

export const whyShare = [
  {
    title: "Protection at checkout",
    body: "Optional trip protection is offered through Bonzah, the licensed broker. Share Your Car does not underwrite coverage.",
  },
  {
    title: "Support hours",
    body: "Trip support is open daily, 8 AM–8 PM ET. Urgent issues are prioritized.",
  },
  {
    title: "Checked drivers",
    body: "A driver must be 21 or older, licensed, and listed on the agreement before pickup.",
  },
  {
    title: "Local cars",
    body: "The cars belong to local hosts. The daily rate on the car is the rate in the quote.",
  },
]

/**
 * Tool names from the live Host tools page.
 * The live page also claims 40% more earnings and 3x bookings. Those claims are not used.
 */
export const hostTools = [
  {
    title: "Vehicle listing manager",
    body: "Photos, a description, and the days the car is free.",
    points: ["More than one photo", "Instant booking when you allow it", "A calendar you can block"],
  },
  {
    title: "Pricing",
    body: "You set the daily rate. The cars listed today are $50 or $105.",
    points: ["The price is on the car", "The quote uses that rate", "No extra marketplace number"],
  },
  {
    title: "Booking management",
    body: "See a request, decide, and keep the trip on one timeline.",
    points: ["You approve or decline", "The guest is named on the trip", "Dates stay on the booking"],
  },
  {
    title: "Performance",
    body: "The fleet page shows earnings, active rentals, and the response rate for this prototype.",
    points: ["Monthly earnings", "Active rentals", "Next payout"],
  },
  {
    title: "Photos",
    body: "Each listing uses the photos already on the car. Guests can swipe them.",
    points: ["Two photos on every car", "Arrows and dots on the card", "The same photos on the booking page"],
  },
  {
    title: "Guest messages",
    body: "Trip notes stay on the trip. This prototype does not send them.",
    points: ["A note on the trip", "Support email if you need a person", "No message leaves this browser"],
  },
  {
    title: "Payouts",
    body: "Hosts are paid within 48 hours after the trip ends, subject to payment processing and dispute review.",
    points: ["The next payout is shown", "Stripe is marked connected", "Nothing is charged for real"],
  },
  {
    title: "Safety",
    body: "Identity is checked, and protection is chosen at checkout through Bonzah.",
    points: ["Drivers 21 or older", "Listed on the agreement", "A valid host auto policy"],
  },
]

/** Coverage names and responsibility caps are from the live protection page. Checkout on this prototype uses two plans only. */
export const coverageTypes = [
  {
    mark: "CDW",
    title: "Collision Damage Waiver",
    body: "Physical damage to the rental car when there is an accident with another vehicle.",
  },
  {
    mark: "RCLI",
    title: "Renter's Contingent Liability",
    body: "Damage to someone else's property, and injury, when the renter is at fault. It does not cover the rental car or its occupants. It provides state minimum coverage where the law allows.",
  },
  {
    mark: "SLI",
    title: "Supplemental Liability",
    body: "Adds to RCLI. It is not a policy on its own. It is bought together with RCLI.",
  },
  {
    mark: "PA",
    title: "Personal accident and effects",
    body: "Life, medical expenses, and lost or damaged belongings. This is not coverage for the rental car.",
  },
]

export const protectionTiers = [
  {
    title: "Basic",
    body: "Collision Damage Waiver for an eligible trip.",
    owe: "Up to $2,500",
  },
  {
    title: "Standard",
    body: "Collision Damage Waiver plus contingent liability.",
    owe: "Up to $1,000",
  },
  {
    title: "Premium",
    body: "Collision Damage Waiver, contingent liability, and supplemental liability.",
    owe: "Up to $500",
  },
]

export const protectionFaqs = [
  {
    question: "Do I have to buy a protection plan?",
    answer:
      "No. The plans at checkout are optional. The trip still follows the rental agreement. Share Your Car does not underwrite coverage.",
  },
  {
    question: "Does my own car insurance cover the rental?",
    answer:
      "Ask your own insurer. This site does not promise that a personal auto policy covers a peer-to-peer trip.",
  },
  {
    question: "What is the difference between liability and vehicle damage?",
    answer:
      "The collision waiver is damage to the rental car. Contingent and supplemental liability are about harm to other people when the renter is at fault.",
  },
  {
    question: "How much would I owe?",
    answer:
      "On Bonzah's published tiers, the renter's maximum responsibility for covered damage is up to $2,500, $1,000, or $500, depending on the tier. This prototype's checkout uses two plans instead: Bonzah Basic at $15 a day and Roamly at $25 a day. The total is shown before you confirm.",
  },
  {
    question: "What should I do in an emergency?",
    answer:
      "Call 911 first if anyone is hurt. Then reach the host and support@shareyourcar.us. Trip support is open daily, 8 AM–8 PM ET.",
  },
  {
    question: "Can I add another driver?",
    answer:
      "Every driver must be 21 or older, hold a valid license, and be listed on the agreement before pickup. An unlisted driver is the renter's responsibility.",
  },
]

export const legalDocs = [
  {
    title: "Terms of Service",
    body: "Rules for using Share Your Car. Renters must be 21 or older and hold a valid driver's license.",
  },
  {
    title: "Cancellation Policy",
    body: "A refund depends on when you cancel and on the cancellation policy for that trip.",
  },
  {
    title: "Privacy Policy",
    body: "Questions about account information go to support@shareyourcar.us.",
  },
  {
    title: "Community Guidelines",
    body: "How guests and hosts are expected to treat each other and the car.",
  },
  {
    title: "Nondiscrimination Policy",
    body: "Hosting and booking must follow applicable nondiscrimination rules.",
  },
  {
    title: "Required Insurance for Hosts",
    body: "Hosts keep an active auto policy and confirm with their insurer that peer-to-peer sharing is allowed.",
  },
  {
    title: "Driver Screening",
    body: "Drivers are screened before a trip is confirmed and must be listed on the agreement.",
  },
  {
    title: "Cookie Policy",
    body: "This prototype stores trip choices in the browser only. A refresh clears them.",
  },
]
