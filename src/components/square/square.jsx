import React from 'react';
import './square.css';

const Square = ({color, handleClick, visible = true}) => {
  return (
    <div
      className={`square ${visible === true ?  'active' : 'hide'}`}
      Style={`background-color: ${color}`}
      onClick={() => handleClick(color)}
    />
  )
}

export default Square
