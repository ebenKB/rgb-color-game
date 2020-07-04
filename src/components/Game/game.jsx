/* eslint-disable react/jsx-no-target-blank */
import React, {Component} from 'react'
import Squares from '../squares/squares';
import GmaeOver from '../game-over/game-over';
import Audio from '../../../src/audio/game-over.mp3';
import Win from '../../../src/audio/win.mp3';
import Divider from '../divider/divider';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameMode: 'easy',
      guessColor: null,
      colorOptions: [
      ],
      score: 0,
      steps: 6,
      trialsLeft: 3,
      maximumTrials: 3,
      timeLeft: 15,
      isGameOver: false,
      level: 1,
      playing: false,
      success: false,
    }
  }
  componentDidMount() {
    // const { trialsLeft, isGameOver } = this.state;
    // if (trialsLeft > 0) {
    //   this.createColorPalette();
    //   if (!isGameOver) {
    //     this.startCountTime();
    //   }
    // }
  }

  getRandomNumber = (min, max) => {
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  initializeGame = () => {

  }

  checkColor = (color) => {
    const { trialsLeft, colorOptions, isGameOver } = this.state;
    if (!isGameOver && trialsLeft > 0) { // check if the player can play more
      if (color === this.state.guessColor) { // won game
        this.setState((state) => ({
          ...state,
          score: state.score + 5,
          success: true,
        }), () => { this.createColorPalette(); })
      } else { // lost game
        // remove the color from the options
        const remainingColors = colorOptions.filter((f) => f !== color);
        const trialsRem = trialsLeft - 1;
        this.setState((state) => ({
          ...state,
          trialsLeft: trialsRem,
          colorOptions: remainingColors,
          isGameOver: ( trialsRem === 0 )
        }))
      }
    } else if (trialsLeft === 0) {
      // set game over and show the right answer
      this.setState((state) => ({...state, isGameOver: true, playing: false }))
    }
  };

  generateRGBColors = () => {
    const { steps } = this.state;
    let colors = [];
    for (let i=0; i< steps; i++) {
      const r = this.getRandomNumber(0, 255);
      const g = this.getRandomNumber(0, 255);
      const b = this.getRandomNumber(0, 255);
      colors = [...colors, `rgb(${r}, ${g}, ${b})`]
    }
    return colors;
  }

  createColorPalette = () => {
    const colors = this.generateRGBColors();
    const guess = this.getRandomNumber(0, 5)
    this.setState((state) => ({
      ...state,
      success: false,
      colorOptions: colors,
      guessColor: colors[guess]
    }))

    this.regenerateLife();
    this.resetTime();
  };

  regenerateLife = () => {
    this.setState((state) => ({
      ...state,
      trialsLeft: state.maximumTrials,
    }))
  }

  startCountTime = () => {
    const { isGameOver, playing } = this.state
    if (!isGameOver && playing) {
      const interval = setInterval(() => {
        const { timeLeft, isGameOver, playing} = this.state;
        let newTime = timeLeft - 1;
        if (!isGameOver && playing) {
          this.setState((state) => ({
            ...state,
            timeLeft: newTime,
          }))
        } else {
          clearInterval(interval);
        }

        if (newTime === 0) {
          this.setState((state) => ({...state, isGameOver: true}))
          clearInterval(interval);
        }
      }, 1000)
    }
  }

  resetGame = async () => {
    this.setState((state) => ({
      ...state,
      isGameOver: false,
      score: 0,
      timeLeft: 15,
      trialsLeft: 3,
      playing: false,
    }))

    this.createColorPalette();
  }

  startGame = async () => {
    await this.resetGame();
    const { trialsLeft, isGameOver, playing } = this.state;
    if (!playing) {
      if (trialsLeft > 0) {
        this.createColorPalette();
        this.setState((state) => ({
          ...state,
          playing: true,
        }), () => {
          if (!isGameOver) {
            this.startCountTime();
          }
        })
      }
    }
  };

  resetTime = () => {
    this.setState((state) => ({
      ...state,
      timeLeft: 15,
    }))
  }

  render() {
    const { colorOptions, score, guessColor, trialsLeft, timeLeft, level, isGameOver, success } = this.state;
    return (
      <div>
        {isGameOver && (
          <audio src={Audio} autoPlay />
        )}
        {success && (
          <audio src={Win} autoPlay />
        )}
        <h1 Style="text-align:center; background-color: lightBlue; padding: 10px">
          RGB COLOUR GUESSING GAME
        </h1>
        {isGameOver && <GmaeOver />}
        <h3 Style="text-align: center">Time Left: {timeLeft} secs</h3>
        <div className="score-board text-center">
          <div>Level: {level}</div>
          <div>Score: {score}</div>
          <div>Trials Left: {trialsLeft}</div>
        </div>
        <Divider />
        <div className="text-center">
          <h3>What colour is this?</h3>
          <h1 Style={isGameOver ? `color: ${guessColor}`: ''}>{guessColor}</h1>
        </div>
        <Squares
          colors = {colorOptions}
          handleClick={this.checkColor}
        />
        <div Style="text-align:center; width: 100%" className="flex-wrapper flex-center">
          {isGameOver && (
            <button 
              className="default"
              onClick={this.resetGame}
            >
              RESET
            </button>
          )}
        <button 
          className="primary"
          onClick={this.startGame}
        >
          START GAME
        </button>
        </div>
        <div className="text-center page-link">
          <a href="http://www.hubkbs.com" target="_blank">
            Want to know more? Contact Hub KB.S
          </a>
        </div>
      </div>
    )
  }
}

export default Game
