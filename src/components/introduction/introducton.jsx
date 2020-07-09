import React, { useState } from 'react';
import './introduction.css';

const Introducton = ({handleAction}) => {
  const [intro] = useState([
    "<div><p>Welcome to the world of colour guessing."+
    "</p><p>RGB color guess allows you to sharpen your RGB skills.</p> <div class=\"text-center\"><img src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSnUksxXEZADcDG9S38GnBYUJrcYnb7O6Lfqg&usqp=CAU\" alt=\"image\"/></div> </div>",
    "<div><p>Do you remember that three colours (R, G, B) combine to give all colours?</p>"+
    "<p>E.g rgb(0, 255, 0) is <div class=\"square\" style=\"background: rgb(0, 255, 0)\"/></p></div>",
    "<div> <p>Start by guessing an RGB colour.</p> <p>What colour is this? <span class=\"intro-caption\">rgb(255, 0, 0) </span></p></div>",
    "<div><p>If you guessed red, you are correct.</p><div class=\"square\" style=\"background: rgb(255, 0, 0)\"></div></div>",
    "<div>Once you are ready, start the game. <p class=\"intro-caption\">Click on the right color to select.</p></div>",
    "<div>You have 15 seconds and 3 attempts for each guess.</div>",
    `<div><p>Good luck</p></div>`
  ])

  const [currentPointer, setCurrentPointer] = useState(0);

  const next = () => {
    if (currentPointer < intro.length - 1) {
      setCurrentPointer(currentPointer + 1);
    }
  }

  const previous = () => {
    if (currentPointer > 0) {
      setCurrentPointer(currentPointer - 1);
    }
  }

  return (
    <div className="introduction__wrapper">
    <div className="introduction">
      <div className="introduction-heading">
        RGB Colour Guess
      </div>
      <div className="introduction-body">
        <h3 dangerouslySetInnerHTML={{__html: intro[currentPointer]} }/>
      </div>
      <div className="introduction-footer">
        <button
          onClick={previous}
          disabled={currentPointer === 0}
        >
          Previous
        </button>
        <button 
          onClick={next}
          disabled={currentPointer === intro.length -1}
        >
          Next
        </button>
        <button onClick={handleAction} className="primary">
          Play Game
        </button>
      </div>
    </div>
    </div>
  )
}

export default Introducton
