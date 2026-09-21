import type { Warframe } from "@/lib/warframe-api";

type WarframeCardProps = {
  warframe: Warframe;
};

export default function WarframeBuildCard({ warframe }: WarframeCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl bg-slate-800 transition duration-300 hover:scale-105">
      <div className="flex h-64 items-center justify-center overflow-hidden">
        <img
          src={`https://cdn.warframestat.us/img/${warframe.imageName}`}
          alt={warframe.name}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold">{warframe.name}</h2>

        <div className="mt-3 space-y-1 text-slate-300">
          <p>Vida: {warframe.health}</p>
          <p>Escudo: {warframe.shield}</p>
          <p>Armadura: {warframe.armor}</p>
          <p>Energia: {warframe.power}</p>
          <p>Velocidade: {warframe.sprintSpeed}</p>
        </div>
      </div>
    </div>
  );
}
