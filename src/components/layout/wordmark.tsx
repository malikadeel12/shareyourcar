/**
 * What: the real Share Your Car logo in the header and footer.
 * Why: the site should use the same mark visitors already know from
 *      shareyourcar.us, not a typed name with a dot.
 * Related: public/logo-shareyourcar.png, src/app/icon.png
 */

import Image from "next/image"
import Link from "next/link"

export function Wordmark() {
  return (
    <Link
      href="/"
      className="inline-flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
    >
      <Image
        src="/logo-shareyourcar.png"
        alt="Share Your Car"
        width={299}
        height={222}
        priority
        className="h-11 w-auto dark:brightness-0 dark:invert"
      />
    </Link>
  )
}
