import Link from "next/link";
import Image from "next/image";

export default function MyBuildCard() {
  return (
    <Link href="/mybuilds">
      <div className="group relative w-full cursor-pointer overflow-hidden rounded-xl">
        <Image
          src="/images/oraxiapic.png"
          alt="Builds"
          width={500}
          height={300}
          className="w-full transition duration-300 group-hover:scale-105"
        />

        <div
          className="
      absolute inset-0
      flex items-center justify-center
      bg-black/30
      transition
      group-hover:bg-black/50
    "
        >
          <h2
            className="
        text-3xl
        font-bold
        text-white
        drop-shadow-lg
      "
          >
            Minhas builds
          </h2>
        </div>
      </div>
    </Link>
  );
}
