import type { Metadata } from "next"

import { HomeScreen } from "@/components/home/home-screen"

export const metadata: Metadata = {
  title: "Rent the Perfect Car from Local Hosts",
}

export default function HomePage() {
  return <HomeScreen />
}
