import React from 'react';
import './score-board.css';

const GameLevels = () => {
  return (
    <div className="score-board">
      <div>
        <span>Score: 0</span>
        <span>Trials Left: 3</span>
      </div>
      <div>
        <span>EASY</span>
        <span>HARD</span>
        <span>VERY HARD</span>
      </div>
    </div>
  )
}

export default GameLevels