export interface CharacterStats {
  hp: number;
  maxHp: number;
  aether: number;
  maxAether: number;
  attack: number;
  defense: number;
  resonance: number;
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  damage: number;
  aetherCost: number;
  resonanceGain: number;
}

export interface Character {
  id: string;
  name: string;
  stats: CharacterStats;
  echoes: Ability[];
}

export interface Enemy {
  id: string;
  name: string;
  stats: CharacterStats;
  intent: string;
}

export interface Choice {
  text: string;
  nextSceneId: string;
  requirement?: {
    stat?: keyof CharacterStats;
    value?: number;
    flag?: string;
  };
  action?: {
    type: 'GAIN_ITEM' | 'SET_FLAG' | 'RESTORE_HP' | 'TRIGGER_COMBAT';
    payload: any;
  };
}

export interface Scene {
  id: string;
  speaker: string;
  text: string;
  choices: Choice[];
  background?: string;
}

export interface GameState {
  player: Character;
  flags: Record<string, boolean>;
  inventory: string[];
  currentSceneId: string;
  shards: number;
  isCombat: boolean;
  activeEnemy?: Enemy;
}

export interface CombatState {
  playerHp: number;
  playerAether: number;
  playerResonance: number;
  enemyHp: number;
  isPlayerTurn: boolean;
  log: string[];
}
