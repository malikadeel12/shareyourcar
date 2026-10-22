import type { Metadata } from "next"

import { FavoritesScreen } from "@/components/favorites/favorites-screen"

export const metadata: Metadata = {
  title: "Favorites",
}

export default function FavoritesPage() {
  return <FavoritesScreen />
}
