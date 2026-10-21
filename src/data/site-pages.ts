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
