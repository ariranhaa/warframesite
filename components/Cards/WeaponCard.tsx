import type { Weapon } from "@/lib/warframe-api";
import Link from "next/link";

type WeaponCardProps = {
  weapon: Weapon;
};

export default function WeaponCard({ weapon }: WeaponCardProps) {
  return (
    <Link
      href={`/builds/primary/${weapon.name.toLowerCase().replaceAll(" ", "-")}`}
    >
      <div className="overflow-hidden rounded-xl bg-slate-800 transition duration-300 hover:scale-105">
        {weapon.imageName && (
          <img
            src={`https://cdn.warframestat.us/img/${weapon.imageName}`}
            alt={weapon.name}
            className="h-full w-full object-contain"
          />
        )}

        <div className="p-4">
          <h2 className="text-xl font-bold">{weapon.name}</h2>

          <p className="text-slate-400">{weapon.type}</p>

          <p className="text-slate-300">Dano base: {weapon.totalDamage}</p>
        </div>
      </div>
    </Link>
  );
}
