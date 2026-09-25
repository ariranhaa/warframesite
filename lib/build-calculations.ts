import type { Weapon, Mod } from "@/lib/warframe-api";

export type EquippedMod = {
  mod: Mod;
  rank: number;
};

export type DamageStats = {
  impact: number;
  puncture: number;
  slash: number;
  heat: number;
  cold: number;
  electricity: number;
  toxin: number;
  blast: number;
  radiation: number;
  gas: number;
  magnetic: number;
  viral: number;
  corrosive: number;
  void: number;
};

export type WeaponStats = {
  damage: DamageStats;

  criticalChance: number;
  criticalMultiplier: number;
  statusChance: number;

  fireRate: number;
  multishot: number;

  magazineSize: number;
  reloadTime: number;
};

type ModEffects = {
  damage?: number;

  impact?: number;
  puncture?: number;
  slash?: number;

  heat?: number;
  cold?: number;
  electricity?: number;
  toxin?: number;

  criticalChance?: number;
  criticalMultiplier?: number;
  statusChance?: number;

  fireRate?: number;
  multishot?: number;

  magazineSize?: number;
  reloadSpeed?: number;
};

export function getBaseWeaponStats(weapon: Weapon): WeaponStats {
  return {
    damage: {
      impact: weapon.damage.impact ?? 0,
      puncture: weapon.damage.puncture ?? 0,
      slash: weapon.damage.slash ?? 0,
      heat: weapon.damage.heat ?? 0,
      cold: weapon.damage.cold ?? 0,
      electricity: weapon.damage.electricity ?? 0,
      toxin: weapon.damage.toxin ?? 0,
      blast: weapon.damage.blast ?? 0,
      radiation: weapon.damage.radiation ?? 0,
      gas: weapon.damage.gas ?? 0,
      magnetic: weapon.damage.magnetic ?? 0,
      viral: weapon.damage.viral ?? 0,
      corrosive: weapon.damage.corrosive ?? 0,
      void: weapon.damage.void ?? 0,
    },

    criticalChance: weapon.criticalChance,
    criticalMultiplier: weapon.criticalMultiplier,
    statusChance: weapon.procChance,

    fireRate: weapon.fireRate,
    multishot: weapon.multishot,

    magazineSize: weapon.magazineSize,
    reloadTime: weapon.reloadTime,
  };
}

function getModEffects(mod: Mod, rank: number): ModEffects {
  const stats = mod.levelStats?.[rank]?.stats;

  if (!stats) {
    return {};
  }

  console.log("Mod:", mod.name);
  console.log("Rank:", rank);
  console.log("Stats:", stats);

  const effects: ModEffects = {};

  for (const stat of stats) {
    const valueMatch = stat.match(/([+-]?\d+(?:\.\d+)?)%/);

    if (!valueMatch) {
      continue;
    }

    const value = Number(valueMatch[1]);

    if (stat.includes("Damage") && !stat.includes("Critical")) {
      effects.damage = value;
    }

    if (stat.includes("Critical Damage")) {
      effects.criticalMultiplier = value;
    }

    if (stat.includes("Impact")) {
      effects.impact = value;
    }

    if (stat.includes("Puncture")) {
      effects.puncture = value;
    }

    if (stat.includes("Slash")) {
      effects.slash = value;
    }

    if (stat.includes("Heat")) {
      effects.heat = value;
    }

    if (stat.includes("Cold")) {
      effects.cold = value;
    }

    if (stat.includes("Electricity")) {
      effects.electricity = value;
    }

    if (stat.includes("Toxin")) {
      effects.toxin = value;
    }

    if (stat.includes("Critical Chance")) {
      effects.criticalChance = value;
    }

    if (stat.includes("Status Chance")) {
      effects.statusChance = value;
    }

    if (stat.includes("Fire Rate")) {
      effects.fireRate = value;
    }

    if (stat.includes("Multishot")) {
      effects.multishot = value;
    }
  }

  console.log("EFFECTS:", effects);

  return effects;
}

export function calculateWeaponStats(
  weapon: Weapon,
  equippedMods: EquippedMod[],
): WeaponStats {
  const stats = getBaseWeaponStats(weapon);

  let damageMultiplier = 0;

  const elementalMods: {
    type: "heat" | "cold" | "electricity" | "toxin";
    value: number;
  }[] = [];

  for (const { mod, rank } of equippedMods) {
    const effects = getModEffects(mod, rank);

    if (effects.damage) {
      damageMultiplier += effects.damage / 100;
    }

    if (effects.criticalChance) {
      stats.criticalChance *= 1 + effects.criticalChance / 100;
    }

    if (effects.statusChance) {
      stats.statusChance *= 1 + effects.statusChance / 100;
    }

    if (effects.fireRate) {
      stats.fireRate *= 1 + effects.fireRate / 100;
    }

    if (effects.multishot) {
      stats.multishot *= 1 + effects.multishot / 100;
    }

    if (effects.heat) {
      elementalMods.push({
        type: "heat",
        value: effects.heat / 100,
      });
    }

    if (effects.cold) {
      elementalMods.push({
        type: "cold",
        value: effects.cold / 100,
      });
    }

    if (effects.electricity) {
      elementalMods.push({
        type: "electricity",
        value: effects.electricity / 100,
      });
    }

    if (effects.toxin) {
      elementalMods.push({
        type: "toxin",
        value: effects.toxin / 100,
      });
    }
  }

  function applyElementalMods(
    stats: WeaponStats,
    elementalMods: {
      type: "heat" | "cold" | "electricity" | "toxin";
      value: number;
    }[],
  ) {
    const baseDamage =
      stats.damage.impact +
      stats.damage.puncture +
      stats.damage.slash +
      stats.damage.heat +
      stats.damage.cold +
      stats.damage.electricity +
      stats.damage.toxin;

    for (const elementalMod of elementalMods) {
      const elementalDamage = baseDamage * elementalMod.value;

      stats.damage[elementalMod.type] += elementalDamage;
    }
  }

  // Bônus de dano geral
  if (damageMultiplier !== 0) {
    for (const damageType of Object.keys(stats.damage) as Array<
      keyof DamageStats
    >) {
      stats.damage[damageType] *= 1 + damageMultiplier;
    }
  }
  console.log("ELEMENTAL MODS:", elementalMods);
  applyElementalMods(stats, elementalMods);

  return stats;
}
