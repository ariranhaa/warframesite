"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header>
      <Link href="/" className="flex justify-center py-4">
        <Image
          src="/images/logo.png"
          alt="Warframe Builder"
          width={600}
          height={300}
          className={clsx(
            "h-auto transition-all duration-300",
            isHome
              ? "w-56 sm:w-64 md:w-80 lg:w-96"
              : "w-32 sm:w-34 md:w-42 lg:w-50",
          )}
          priority
        />
      </Link>
    </header>
  );
}
