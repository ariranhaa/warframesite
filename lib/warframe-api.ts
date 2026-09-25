const API_URL = "https://api.warframestat.us";

export type Weapon = {
  name: string;
  uniqueName: string;
  category: string;
  type: string;

  imageName: string;
  description: string;

  totalDamage: number;
  damage: {
    total: number;
    impact: number;
    puncture: number;
    slash: number;
    heat: number;
    [key: string]: number;
  };

  criticalChance: number;
  criticalMultiplier: number;
  procChance: number;

  fireRate: number;
  multishot: number;
  magazineSize: number;
  reloadTime: number;

  masteryReq: number;
  isPrime: boolean;

  polarities: string[];
  exilusPolarity?: string;

  trigger: string;
  noise: string;

  wikiaThumbnail?: string;
  wikiaUrl?: string;
};

export type Warframe = {
  name: string;
  uniqueName: string;
  type: string;
  description: string;
  productCategory: string;
  category: string;

  // Atributos básicos
  health: number;
  shield: number;
  armor: number;
  power: number;
  sprintSpeed: number;

  // Informações de progressão
  masteryReq: number;
  isPrime: boolean;

  // Polaridades
  aura: string;
  polarities: string[];

  // Habilidades
  abilities: unknown[];
  passiveDescription: string;

  // Imagem / Wiki
  imageName: string;
  wikiAvailable: boolean;
  wikiaUrl?: string;
};

export type WarframeBuildStats = {
  strength: number;
  range: number;
  efficiency: number;
  duration: number;
};

export type ModLevelStats = {
  stats: string[];
};

export type Mod = {
  name: string;
  uniqueName: string;

  imageName: string;
  wikiaThumbnail?: string;
  wikiaUrl?: string;

  polarity: string;
  rarity: string;

  baseDrain: number;
  fusionLimit: number;

  category: string;
  type: string;
  compatName?: string;

  isAugment: boolean;
  isPrime: boolean;
  isUtility: boolean;

  levelStats: ModLevelStats[];
};
export async function getWeaponByName(name: string) {
  const weapons = await getWeapons();

  const weapon = weapons.find(
    (weapon) => weapon.name.toLowerCase() === name.toLowerCase(),
  );

  if (!weapon) {
    return null;
  }

  return weapon;
}

export async function getWeapons(): Promise<Weapon[]> {
  const response = await fetch(`${API_URL}/weapons?language=en`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar armas");
  }

  return response.json();
}

export async function getWarframes(): Promise<Warframe[]> {
  const response = await fetch(`${API_URL}/warframes?language=en`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar Warframes");
  }

  return response.json();
}

export async function getMods(): Promise<Mod[]> {
  const response = await fetch(`${API_URL}/mods?language=en`, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar mods");
  }

  return response.json();
}

export function getCompatibleWeaponMods(mods: Mod[], weapon: Weapon): Mod[] {
  return mods.filter((mod) => {
    if (!mod.compatName) {
      return false;
    }

    // Compatibilidade original
    if (mod.compatName.toLowerCase() === weapon.type.toLowerCase()) {
      return true;
    }

    // Mods de Primary
    if (
      weapon.category === "Primary" &&
      mod.compatName.toUpperCase() === "PRIMARY"
    ) {
      return true;
    }

    // Mods de Secondary
    if (
      weapon.category === "Secondary" &&
      mod.compatName.toUpperCase() === "SECONDARY"
    ) {
      return true;
    }

    // Mods de Melee
    if (
      weapon.category === "Melee" &&
      mod.compatName.toUpperCase() === "MELEE"
    ) {
      return true;
    }

    return false;
  });
}

export function removeDuplicateMods(mods: Mod[]): Mod[] {
  return Array.from(
    new Map(mods.map((mod) => [mod.name.toLowerCase(), mod])).values(),
  );
}
