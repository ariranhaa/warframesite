"use client";

import { useState } from "react";
import type { Mod } from "@/lib/warframe-api";

type ModSelectorProps = {
  mods: Mod[];
  onSelect: (mod: Mod) => void;
  onClose: () => void;
};

export default function ModSelector({
  mods,
  onSelect,
  onClose,
}: ModSelectorProps) {
  const [search, setSearch] = useState("");

  const filteredMods = Array.from(
    new Map(
      mods
        .filter((mod) => mod.name.toLowerCase().includes(search.toLowerCase()))
        .map((mod) => [mod.name.toLowerCase(), mod]),
    ).values(),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-slate-800">
        {/* Cabeçalho */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-700 p-4">
          <h2 className="text-xl font-bold">Escolher Mod</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-400 transition hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Pesquisa */}
        <div className="shrink-0 border-b border-slate-700 p-4">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Pesquisar mod..."
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-white outline-none ring-1 ring-slate-700 placeholder:text-slate-500 focus:ring-2 focus:ring-slate-500"
          />
        </div>

        {/* Lista */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
            {filteredMods.map((mod) => (
              <button
                key={mod.uniqueName}
                type="button"
                onClick={() => onSelect(mod)}
                className="group overflow-hidden rounded-lg bg-slate-900 text-left transition hover:-translate-y-1 hover:bg-slate-700"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-slate-950">
                  <img
                    src={`https://cdn.warframestat.us/img/${mod.imageName}`}
                    alt={mod.name}
                    className="h-full w-full object-contain transition duration-200 group-hover:scale-105"
                  />
                </div>

                <div className="p-3">
                  <h3 className="truncate font-bold">{mod.name}</h3>

                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{mod.rarity}</span>

                    <span className="text-xs text-slate-500">
                      {mod.polarity}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredMods.length === 0 && (
            <p className="py-10 text-center text-slate-400">
              Nenhum mod encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
