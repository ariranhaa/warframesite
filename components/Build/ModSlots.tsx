"use client";

import { useState } from "react";
import type { Mod } from "@/lib/warframe-api";
import ModSelector from "./ModSelector";

type EquippedMod = {
  mod: Mod;
  rank: number;
};

type ModSlot = {
  id: number;
  mod: EquippedMod | null;
};
type ModSlotsProps = {
  mods: Mod[];
};

export default function ModSlots({ mods }: ModSlotsProps) {
  const [slots, setSlots] = useState<ModSlot[]>(
    Array.from({ length: 8 }, (_, index) => ({
      id: index,
      mod: null,
    })),
  );

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  function handleSlotClick(id: number) {
    setSelectedSlot(id);
  }

  function handleModSelect(mod: Mod) {
    if (selectedSlot === null) {
      return;
    }

    setSlots((currentSlots) =>
      currentSlots.map((slot) =>
        slot.id === selectedSlot
          ? {
              ...slot,
              mod: {
                mod,
                rank: 0,
              },
            }
          : slot,
      ),
    );

    setSelectedSlot(null);
  }

  function handleCloseSelector() {
    setSelectedSlot(null);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {slots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            onClick={() => handleSlotClick(slot.id)}
            className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-slate-600 bg-slate-900 transition hover:border-slate-400 hover:bg-slate-700"
          >
            {slot.mod ? (
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <img
                  src={`https://cdn.warframestat.us/img/${slot.mod.mod.imageName}`}
                  alt={slot.mod.mod.name}
                  className="h-full w-full object-contain"
                />

                <div className="absolute inset-x-0 bottom-0 bg-black/80 p-2 text-center">
                  <span className="text-sm font-bold text-white">
                    {slot.mod.mod.name}
                  </span>

                  <p className="text-xs text-slate-300">Rank {slot.mod.rank}</p>

                  {slot.mod.mod.levelStats?.[slot.mod.rank]?.stats?.map(
                    (stat: string, index: number) => (
                      <p key={index} className="text-xs text-slate-300">
                        {stat}
                      </p>
                    ),
                  )}

                  <p className="text-xs text-slate-300">
                    {slot.mod.mod.rarity}
                  </p>
                </div>
              </div>
            ) : (
              <span className="text-2xl text-slate-500">+</span>
            )}
          </button>
        ))}
      </div>

      {selectedSlot !== null && (
        <ModSelector
          mods={mods}
          onSelect={handleModSelect}
          onClose={handleCloseSelector}
        />
      )}
    </>
  );
}
