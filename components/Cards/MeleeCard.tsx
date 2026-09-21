import Image from "next/image";
import Link from "next/link";

export default function MeleeCard() {
  return (
    <Link
      href="/builds/melee"
      className="relative min-w-0 flex-1 overflow-hidden rounded-xl transition-all duration-500 hover:flex-[2]"
    >
      <Image
        src="/images/melee.jpg"
        alt="Secundárias"
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">
          Corpo a corpo
        </h2>
      </div>
    </Link>
  );
}
