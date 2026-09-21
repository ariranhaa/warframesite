"use client";

import { useState } from "react";
import type { Mod } from "@/lib/warframe-api";
import ModSelector from "./ModSelector";

type ModSlot = {
  id: number;
  mod: Mod | null;
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
        slot.id === selectedSlot ? { ...slot, mod } : slot,
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
              <div className="flex h-full w-full flex-col items-center justify-center p-2">
                <img
                  src={`https://cdn.warframestat.us/img/${slot.mod.imageName}`}
                  alt={slot.mod.name}
                  className="h-20 w-20 object-contain"
                />

                <span className="mt-1 text-xs">{slot.mod.name}</span>
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
