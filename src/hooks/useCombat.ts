import { useState, useCallback } from 'react';
import type { Character, Ability, Enemy, CombatState } from '../types/game';

// I'll update src/types/game.ts to include the new types to keep it simple
export const useCombat = (player: Character, enemy: Enemy, onWin: () => void, onLoss: () => void) => {
  const [state, setState] = useState<CombatState>({
    playerHp: player.stats.hp,
    playerAether: player.stats.aether,
    playerResonance: 0,
    enemyHp: enemy.stats.hp,
    isPlayerTurn: true,
    log: [`A ${enemy.name} appears!`],
  });

  const executePlayerMove = useCallback((ability: Ability) => {
    if (state.playerAether < ability.aetherCost) {
      setState(prev => ({ ...prev, log: [...prev.log, "Not enough Aether!"] }));
      return;
    }

    setState((prev) => {
      const damage = Math.floor(ability.damage * (1 + prev.playerResonance / 100));
      const newEnemyHp = Math.max(0, prev.enemyHp - damage);
      const newLog = [...prev.log, `You use ${ability.name} for ${damage} damage!`];

      if (newEnemyHp <= 0) {
        setTimeout(onWin, 1500);
        return { ...prev, enemyHp: 0, log: [...newLog, `${enemy.name} is defeated!`] };
      }

      return {
        ...prev,
        enemyHp: newEnemyHp,
        playerAether: prev.playerAether - ability.aetherCost,
        playerResonance: prev.playerResonance + ability.resonanceGain,
        isPlayerTurn: false,
        log: newLog,
      };
    });

    // Enemy Turn Simulation
    setTimeout(() => {
      setState((prev) => {
        if (prev.enemyHp <= 0) return prev;
        
        const enemyDamage = enemy.stats.attack;
        const newPlayerHp = Math.max(0, prev.playerHp - enemyDamage);
        const newLog = [...prev.log, `${enemy.name} attacks for ${enemyDamage} damage!`];

        if (newPlayerHp <= 0) {
          setTimeout(onLoss, 1500);
          return { ...prev, playerHp: 0, log: [...newLog, "You have fallen..."] };
        }

        return {
          ...prev,
          playerHp: newPlayerHp,
          isPlayerTurn: true,
          log: newLog,
        };
      });
    }, 1000);
  }, [state, enemy, onWin, onLoss]);

  return { state, executePlayerMove };
};
