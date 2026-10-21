import { Suspense } from "react"
import type { Metadata } from "next"

import { BookingScreen } from "@/components/booking/booking-screen"

export const metadata: Metadata = {
  title: "Book a car",
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="h-80 rounded-3xl bg-muted" />
        </div>
      }
    >
      <BookingScreen />
    </Suspense>
  )
}
