import type { Metadata } from "next"

import { HostScreen } from "@/components/host/host-screen"

export const metadata: Metadata = {
  title: "Host",
}

export default function HostPage() {
  return <HostScreen />
}
