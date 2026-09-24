"use client";

import { useCallback, useState } from "react";

import type { Mod, Weapon } from "@/lib/warframe-api";

import {
  calculateWeaponStats,
  type EquippedMod,
} from "@/lib/build-calculations";

import ModSlots from "./ModSlots";

type BuildCalculatorProps = {
  weapon: Weapon;
  mods: Mod[];
};

export default function BuildCalculator({
  weapon,
  mods,
}: BuildCalculatorProps) {
  const [equippedMods, setEquippedMods] = useState<EquippedMod[]>([]);

  const handleModsChange = useCallback(
    (mods: EquippedMod[]) => {
      setEquippedMods(mods);

      const stats = calculateWeaponStats(weapon, mods);

      console.log("STATS DA BUILD:", stats);
    },
    [weapon],
  );

  return <ModSlots mods={mods} onModsChange={handleModsChange} />;
}
