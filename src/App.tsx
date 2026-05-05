import React from 'react';
import { useStory } from './hooks/useStory';
import CombatView from './components/CombatView';
import './styles/game.css';

const App: React.FC = () => {
  const { currentScene, handleChoice, gameState, endCombat } = useStory();

  if (gameState.isCombat && gameState.activeEnemy) {
    return (
      <div className="game-container">
        <CombatView 
          player={gameState.player}
          enemy={gameState.activeEnemy}
          onWin={() => endCombat(true)}
          onLoss={() => endCombat(false)}
        />
      </div>
    );
  }

  if (!currentScene) {
    return (
      <div className="game-container">
        <h1>The Silence has consumed everything.</h1>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="stats-panel">
        <div>Weaver: {gameState.player.stats.hp}/{gameState.player.stats.maxHp} HP</div>
        <div>Aether: {gameState.player.stats.aether}/{gameState.player.stats.maxAether}</div>
        <div>Shards: {gameState.shards}</div>
      </div>

      <div className="scene-window fade-in">
        <div className="avatar-placeholder">✧</div>
        <div className="speaker-name">{currentScene.speaker}</div>
        <div className="scene-text">{currentScene.text}</div>

        <div className="choices-container">
          {currentScene.choices.map((choice, index) => (
            <button
              key={index}
              className="choice-button"
              onClick={() => handleChoice(choice)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
