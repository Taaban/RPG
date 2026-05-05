import { useState, useCallback } from 'react';
import type { GameState, Choice, Character, Enemy, Ability } from '../types/game';
import { prologueScenes } from '../data/prologue';
import { act2Scenes } from '../data/act2';
import { act3Scenes } from '../data/act3';

const allScenes = { ...prologueScenes, ...act2Scenes, ...act3Scenes };

const basicStrike: Ability = {
  id: 'strike',
  name: 'Aether Strike',
  description: 'A basic pulse of Aetheric energy.',
  damage: 15,
  aetherCost: 0,
  resonanceGain: 10,
};

const luminescentBurst: Ability = {
  id: 'burst',
  name: 'Luminescent Burst',
  description: 'A powerful blast of memory-light. Consumes Aether.',
  damage: 40,
  aetherCost: 20,
  resonanceGain: 25,
};

const initialPlayer: Character = {
  id: 'player',
  name: 'Weaver',
  stats: {
    hp: 100,
    maxHp: 100,
    aether: 50,
    maxAether: 50,
    attack: 10,
    defense: 5,
    resonance: 0,
  },
  echoes: [basicStrike],
};

const enemies: Record<string, Enemy> = {
  shadow_wisp: {
    id: 'shadow_wisp',
    name: 'Shadow-Wisp',
    stats: {
      hp: 40,
      maxHp: 40,
      aether: 0,
      maxAether: 0,
      attack: 12,
      defense: 2,
      resonance: 0,
    },
    intent: 'Feeding on your memories...',
  },
  echo_warden: {
    id: 'echo_warden',
    name: 'Echo-Warden',
    stats: {
      hp: 120,
      maxHp: 120,
      aether: 0,
      maxAether: 0,
      attack: 20,
      defense: 10,
      resonance: 0,
    },
    intent: 'Guardian of the Silence.',
  },
  the_silence: {
    id: 'the_silence',
    name: 'The Silence',
    stats: {
      hp: 300,
      maxHp: 300,
      aether: 0,
      maxAether: 0,
      attack: 25,
      defense: 15,
      resonance: 0,
    },
    intent: 'The End of All Songs.',
  },
};

const initialState: GameState = {
  player: initialPlayer,
  flags: {},
  inventory: [],
  currentSceneId: 'start',
  shards: 0,
  isCombat: false,
};

export const useStory = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const currentScene = allScenes[gameState.currentSceneId as keyof typeof allScenes];

  const handleChoice = useCallback((choice: Choice) => {
    if (choice.nextSceneId === 'start') {
      setGameState(initialState);
      return;
    }
    setGameState((prev) => {
      let newState = { ...prev };
      // ... (rest of the logic remains)

      if (choice.action) {
        switch (choice.action.type) {
          case 'SET_FLAG':
            newState.flags = { ...prev.flags, [choice.action.payload]: true };
            // Specialized logic for gaining the new ability in Act 2
            if (choice.action.payload === 'first_weave') {
              newState.player = {
                ...prev.player,
                echoes: [...prev.player.echoes, luminescentBurst]
              };
            }
            break;

            break;
          case 'GAIN_ITEM':
            newState.inventory = [...prev.inventory, choice.action.payload];
            break;
          case 'RESTORE_HP':
            newState.player = {
              ...prev.player,
              stats: { ...prev.player.stats, hp: prev.player.stats.maxHp },
            };
            break;
          case 'TRIGGER_COMBAT':
            newState.isCombat = true;
            newState.activeEnemy = enemies[choice.action.payload];
            break;
        }
      }

      newState.currentSceneId = choice.nextSceneId;
      return newState;
    });
  }, []);

  const endCombat = useCallback((victory: boolean) => {
    setGameState((prev) => {
      let nextSceneId = prev.currentSceneId;
      if (victory) {
        if (prev.currentSceneId === 'battle_1') nextSceneId = 'battle_1_win';
        if (prev.currentSceneId === 'battle_2') nextSceneId = 'warden_win';
        if (prev.currentSceneId === 'battle_final') nextSceneId = 'final_win';
      } else {
        nextSceneId = 'game_over';
      }

      return {
        ...prev,
        isCombat: false,
        activeEnemy: undefined,
        currentSceneId: nextSceneId,
        shards: victory ? prev.shards + 1 : prev.shards,
      };
    });
  }, []);

  return {
    gameState,
    currentScene,
    handleChoice,
    endCombat,
  };
};
