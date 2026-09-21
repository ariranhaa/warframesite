import WeaponCard from "@/components/Cards/WeaponCard";
import { getWeapons } from "@/lib/warframe-api";

export default async function PrimaryBuilds() {
  const weapons = await getWeapons();

  const secondaryWeapons = weapons.filter(
    (weapon) => weapon.category === "Primary",
  );

  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">Armas Primárias</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {secondaryWeapons.map((weapon) => (
          <WeaponCard key={weapon.uniqueName} weapon={weapon} />
        ))}
      </div>
    </div>
  );
}
