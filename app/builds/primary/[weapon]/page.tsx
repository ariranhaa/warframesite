import { notFound } from "next/navigation";
import {
  getMods,
  getWeaponByName,
  getCompatibleWeaponMods,
  removeDuplicateMods,
} from "@/lib/warframe-api";
import BuildCalculator from "@/components/Build/BuildCalculator";

type WeaponPageProps = {
  params: Promise<{
    weapon: string;
  }>;
};

export default async function WeaponPage({ params }: WeaponPageProps) {
  const { weapon } = await params;

  const weaponName = weapon.replaceAll("-", " ");

  const weaponData = await getWeaponByName(weaponName);

  if (!weaponData) {
    notFound();
  }

  const mods = await getMods();

  const compatibleMods = getCompatibleWeaponMods(mods, weaponData);

  const uniqueMods = removeDuplicateMods(compatibleMods);

  return (
    <div className="py-6">
      {/* Cabeçalho */}
      <section>
        <h1 className="text-4xl font-bold">{weaponData.name}</h1>

        <p className="mt-1 text-slate-400">{weaponData.type}</p>
      </section>

      {/* Informações principais */}
      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-xl bg-slate-800 p-6">
          <img
            src={`https://cdn.warframestat.us/img/${weaponData.imageName}`}
            alt={weaponData.name}
            className="h-80 w-full object-contain"
          />
        </div>

        <div className="rounded-xl bg-slate-800 p-6">
          <h2 className="mb-4 text-2xl font-bold">Estatísticas</h2>

          <div className="grid grid-cols-2 gap-3">
            <p>
              Dano: <span className="font-bold">{weaponData.totalDamage}</span>
            </p>

            <p>
              Crítico:{" "}
              <span className="font-bold">
                {(weaponData.criticalChance * 100).toFixed(1)}%
              </span>
            </p>

            <p>
              Multiplicador:{" "}
              <span className="font-bold">
                {weaponData.criticalMultiplier}x
              </span>
            </p>

            <p>
              Status:{" "}
              <span className="font-bold">
                {(weaponData.procChance * 100).toFixed(1)}%
              </span>
            </p>

            <p>
              Cadência: <span className="font-bold">{weaponData.fireRate}</span>
            </p>

            <p>
              Multishot:{" "}
              <span className="font-bold">{weaponData.multishot}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Mods */}
      <section className="mt-8 rounded-xl bg-slate-800 p-6">
        <h2 className="mb-5 text-2xl font-bold">Mods</h2>

        <BuildCalculator weapon={weaponData} mods={uniqueMods} />
      </section>
    </div>
  );
}
