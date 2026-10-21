"use client"

/**
 * What: light / dark switch for the whole prototype.
 * Why: light mode uses black buttons. Dark mode flips them to paper.
 * Related: src/app/layout.tsx
 */

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // Wait until the client theme is known so the icon does not flip during hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const dark = mounted && resolvedTheme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  )
}
