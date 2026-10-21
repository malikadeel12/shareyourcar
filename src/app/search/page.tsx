import { Suspense } from "react"
import type { Metadata } from "next"

import { SearchScreen } from "@/components/search/search-screen"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Search cars",
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10">
          <Skeleton className="h-16 w-2/3" />
          <Skeleton className="h-28 w-full rounded-3xl" />
        </div>
      }
    >
      <SearchScreen />
    </Suspense>
  )
}
