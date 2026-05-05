import React from 'react';
import type { Character, Enemy, Ability } from '../types/game';
import { useCombat } from '../hooks/useCombat';

interface CombatViewProps {
  player: Character;
  enemy: Enemy;
  onWin: () => void;
  onLoss: () => void;
}

const CombatView: React.FC<CombatViewProps> = ({ player, enemy, onWin, onLoss }) => {
  const { state, executePlayerMove } = useCombat(player, enemy, onWin, onLoss);

  return (
    <div className="combat-container fade-in">
      <div className="enemy-side">
        <div className="avatar-placeholder avatar-enemy">◈</div>
        <div className="entity-name">{enemy.name}</div>
        <div className="hp-bar">
          <div 
            className="hp-fill" 
            style={{ width: `${(state.enemyHp / enemy.stats.hp) * 100}%` }}
          ></div>
        </div>
        <div className="hp-text">{state.enemyHp} / {enemy.stats.hp} HP</div>
        <div className="enemy-intent">{enemy.intent}</div>
      </div>

      <div className="combat-log">
        {state.log.map((entry, i) => (
          <div key={i} className="log-entry">{entry}</div>
        ))}
      </div>

      <div className="player-side">
        <div className="resonance-meter">Resonance: {state.playerResonance}%</div>
        <div className="hp-bar">
          <div 
            className="hp-fill player-hp" 
            style={{ width: `${(state.playerHp / player.stats.hp) * 100}%` }}
          ></div>
        </div>
        <div className="hp-text">{state.playerHp} / {player.stats.hp} HP</div>
        
        <div className="aether-bar">
          <div 
            className="aether-fill" 
            style={{ width: `${(state.playerAether / player.stats.maxAether) * 100}%` }}
          ></div>
        </div>
        <div className="aether-text">{state.playerAether} / {player.stats.maxAether} Aether</div>

        <div className="abilities-container">
          {player.echoes.map((ability) => (
            <button
              key={ability.id}
              className="ability-button"
              disabled={!state.isPlayerTurn || state.playerAether < ability.aetherCost}
              onClick={() => executePlayerMove(ability)}
            >
              <div className="ability-name">{ability.name}</div>
              <div className="ability-cost">{ability.aetherCost} AE</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombatView;
