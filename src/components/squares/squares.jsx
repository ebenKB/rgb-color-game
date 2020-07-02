import React from 'react';
import './squares.css';
import Square from '../square/square';

const Squares = ({colors, checkColor, handleClick}) => {
  return (
    <div className="squares-wrapper">
      <div className="squares-wrapper__content">
        {colors.map((color) => (
          <Square 
            key={color} 
            color={color} 
            handleClick={handleClick}
          />))}
      </div>
    </div>
  )
}

export default Squares
