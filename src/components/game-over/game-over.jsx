import React, { useState } from 'react';
import './game-over.css';

const GmaeOver = ({ totalScore }) => {
  const [isShowing, setIsShowing] = useState(true);
  return (
    <>
      {isShowing && (
      <div className="game-over__wrapper text-center">
        <div className="game-over__overlay" />
        <div className="game-over__content">
          <div className="caption">
            <span>Score: </span>
            <span className="bold big-caption">{totalScore}</span>
            <h1>GAME OVER</h1>
            <button onClick={() => setIsShowing(false)}>
              New Game
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default GmaeOver;
