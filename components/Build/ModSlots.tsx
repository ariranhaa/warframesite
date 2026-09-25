"use client";

import { useState, useEffect } from "react";
import type { Mod } from "@/lib/warframe-api";
import ModSelector from "./ModSelector";
import { EquippedMod } from "@/lib/build-calculations";

type ModSlot = {
  id: number;
  mod: EquippedMod | null;
};
type ModSlotsProps = {
  mods: Mod[];
  onModsChange: (equippedMods: EquippedMod[]) => void;
};

export default function ModSlots({ mods, onModsChange }: ModSlotsProps) {
  const [slots, setSlots] = useState<ModSlot[]>(
    Array.from({ length: 8 }, (_, index) => ({
      id: index,
      mod: null,
    })),
  );
  const [exilusSlot, setExilusSlot] = useState<ModSlot>({
    id: 8,
    mod: null,
  });

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);

  useEffect(() => {
    const equippedMods = [
      ...slots.filter((slot) => slot.mod !== null).map((slot) => slot.mod!),

      ...(exilusSlot.mod ? [exilusSlot.mod] : []),
    ];

    onModsChange(equippedMods);
  }, [slots, exilusSlot, onModsChange]);

  function handleSlotClick(id: number) {
    setSelectedSlot(id);
  }

  function handleModSelect(mod: Mod) {
    if (selectedSlot === null) {
      return;
    }

    if (selectedSlot === 8) {
      setExilusSlot({
        id: 8,
        mod: {
          mod,
          rank: 0,
        },
      });

      setSelectedSlot(null);
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

  function handleRankChange(slotId: number, change: number) {
    if (slotId === 8) {
      setExilusSlot((currentSlot) => {
        if (!currentSlot.mod) {
          return currentSlot;
        }

        const maxRank = currentSlot.mod.mod.levelStats.length - 1;

        const newRank = Math.max(
          0,
          Math.min(maxRank, currentSlot.mod.rank + change),
        );

        return {
          ...currentSlot,
          mod: {
            ...currentSlot.mod,
            rank: newRank,
          },
        };
      });

      return;
    }

    setSlots((currentSlots) =>
      currentSlots.map((slot) => {
        if (slot.id !== slotId || !slot.mod) {
          return slot;
        }

        const maxRank = slot.mod.mod.levelStats.length - 1;

        const newRank = Math.max(0, Math.min(maxRank, slot.mod.rank + change));

        return {
          ...slot,
          mod: {
            ...slot.mod,
            rank: newRank,
          },
        };
      }),
    );
  }

  function handleRemoveMod(slotId: number) {
    if (slotId === 8) {
      setExilusSlot({
        id: 8,
        mod: null,
      });

      setEditingSlot(null);
      return;
    }

    setSlots((currentSlots) =>
      currentSlots.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              mod: null,
            }
          : slot,
      ),
    );

    setEditingSlot(null);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            onClick={() => {
              if (slot.mod) {
                setEditingSlot(editingSlot === slot.id ? null : slot.id);
              } else {
                handleSlotClick(slot.id);
              }
            }}
            className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-600 bg-slate-900 transition hover:border-slate-400 hover:bg-slate-700"
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

                  {editingSlot === slot.id ? (
                    <div className="mt-1 flex flex-col items-center">
                      {/* Controle de Rank */}
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRankChange(slot.id, -1);
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white transition hover:bg-slate-600"
                        >
                          −
                        </button>

                        <span className="min-w-16 text-center text-xs text-slate-300">
                          Rank {slot.mod.rank}
                        </span>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleRankChange(slot.id, 1);
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white transition hover:bg-slate-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="mt-1 text-xs text-slate-300">
                      Rank {slot.mod.rank}
                    </p>
                  )}

                  {/* Stats do mod */}
                  {slot.mod.mod.levelStats?.[slot.mod.rank]?.stats?.map(
                    (stat: string, index: number) => (
                      <p key={index} className="text-xs text-slate-300">
                        {stat}
                      </p>
                    ),
                  )}

                  {/* Raridade */}
                  <p className="text-xs text-slate-300">
                    {slot.mod.mod.rarity}
                  </p>

                  {/* Remover */}
                  {editingSlot === slot.id && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRemoveMod(slot.id);
                      }}
                      className="mt-2 rounded bg-red-700 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-600"
                    >
                      Remover
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <span className="text-2xl text-slate-500">+</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <div
          onClick={() => {
            if (exilusSlot.mod) {
              setEditingSlot(
                editingSlot === exilusSlot.id ? null : exilusSlot.id,
              );
            } else {
              handleSlotClick(exilusSlot.id);
            }
          }}
          className="flex aspect-square w-[calc((100%-36px)/4)] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-600 bg-slate-900 transition hover:border-slate-400 hover:bg-slate-700"
        >
          {exilusSlot.mod ? (
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <img
                src={`https://cdn.warframestat.us/img/${exilusSlot.mod.mod.imageName}`}
                alt={exilusSlot.mod.mod.name}
                className="h-full w-full object-contain"
              />

              <div className="absolute inset-x-0 bottom-0 bg-black/80 p-2 text-center">
                <span className="text-sm font-bold text-white">
                  {exilusSlot.mod.mod.name}
                </span>

                {editingSlot === exilusSlot.id ? (
                  <>
                    <div className="mt-1 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRankChange(exilusSlot.id, -1);
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white transition hover:bg-slate-600"
                      >
                        −
                      </button>

                      <span className="min-w-16 text-center text-xs text-slate-300">
                        Rank {exilusSlot.mod.rank}
                      </span>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRankChange(exilusSlot.id, 1);
                        }}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white transition hover:bg-slate-600"
                      >
                        +
                      </button>
                    </div>

                    {exilusSlot.mod.mod.levelStats?.[
                      exilusSlot.mod.rank
                    ]?.stats?.map((stat: string, index: number) => (
                      <p key={index} className="text-xs text-slate-300">
                        {stat}
                      </p>
                    ))}

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleRemoveMod(exilusSlot.id);
                      }}
                      className="mt-2 w-full rounded bg-red-700 px-2 py-1 text-xs font-bold text-white transition hover:bg-red-600"
                    >
                      Remover
                    </button>
                  </>
                ) : (
                  <>
                    <p className="mt-1 text-xs text-slate-300">
                      Rank {exilusSlot.mod.rank}
                    </p>

                    {exilusSlot.mod.mod.levelStats?.[
                      exilusSlot.mod.rank
                    ]?.stats?.map((stat: string, index: number) => (
                      <p key={index} className="text-xs text-slate-300">
                        {stat}
                      </p>
                    ))}

                    <p className="text-xs text-slate-300">
                      {exilusSlot.mod.mod.rarity}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <span className="text-2xl text-slate-500">+</span>
          )}
        </div>
      </div>

      {selectedSlot !== null && (
        <ModSelector
          mods={mods}
          exilusOnly={selectedSlot === 8}
          onSelect={handleModSelect}
          onClose={handleCloseSelector}
        />
      )}
    </>
  );
}
