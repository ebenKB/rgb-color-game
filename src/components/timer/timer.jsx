import React from 'react';
import './timer.css';

const Timer = ({ time }) => {
  return (
    <div className="timer">
      <div className="small-caption">Time Left</div>
      <h1>{time}</h1>
    </div>
  )
}

export default Timer
