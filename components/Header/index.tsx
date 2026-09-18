import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-slate-900">
      <Link href="/" className="flex justify-center py-2">
        <Image
          src="/images/logo.png"
          alt="Warframe Builder"
          width={600}
          height={300}
          className="h-auto w-56 sm:w-64 md:w-80 lg:w-96"
          priority
        />
      </Link>
    </header>
  );
}
