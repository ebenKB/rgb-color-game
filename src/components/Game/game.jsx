/* eslint-disable react/jsx-no-target-blank */
import React, {Component} from 'react'
import Squares from '../squares/squares';
import GmaeOver from '../game-over/game-over';
import Audio from '../../../src/audio/game-over.mp3';
import Win from '../../../src/audio/win.mp3';
import Divider from '../divider/divider';
import Introducton from '../introduction/introducton';
import Settings from '../settings/settings';
import './game.css';
import Timer from '../timer/timer';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canShowIntro: false,
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
      isMuted: true,
    }
  }
  componentDidMount() {
    // set the default game steps
    const { steps } = this.state;
    let trials = null;
    if (steps < 4) {
      trials = 2;
    } else {
      trials = Math.ceil(steps / 2)
    }
    this.setState((state) => ({
      ...state,
      trailsLeft: trials,
      maximumTrials: trials,
    }),() => console.log('We set trials', this.state))
  }

  getRandomNumber = (min, max) => {
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  initializeGame = () => {

  }

  setVolume = () => {
    const {isMuted} = this.state;
    this.setState((state) => ({
      isMuted: !isMuted,
    }))
  };

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
    const { steps } = this.state;
    const colors = this.generateRGBColors();
    const guess = this.getRandomNumber(0, (steps -1))
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
    } return
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
    const { trialsLeft, playing, timeLeft } = this.state;
    if (!playing || trialsLeft === 0 || timeLeft === 0) {
      await this.resetGame();
      // if (trialsLeft > 0) {
        // this.createColorPalette();
        this.setState((state) => ({
          ...state,
          playing: true,
          isGameOver: false,
        }), () => {
          // if (!isGameOver) {
            this.startCountTime();
          // }
        })
      // }
    }
  };

  closeIntro = () => {
    this.setState((state) => ({
      ...state,
      canShowIntro: false,
    }))
  }

  showIntro = () => {
    this.setState((state) => ({
      ...state,
      canShowIntro: true,
    }))
  }

  resetTime = () => {
    this.setState((state) => ({
      ...state,
      timeLeft: 15,
    }))
  }

  render() {
    const {
      colorOptions,
      score,
      guessColor,
      trialsLeft,
      timeLeft,
      isGameOver,
      success,
      canShowIntro,
      playing,
      isMuted
    } = this.state;
    return (
      <div>
        {isGameOver && !isMuted && (
          <audio src={Audio} autoPlay />
        )}
        {success && !isMuted && (
          <audio src={Win} autoPlay />
        )}
        {canShowIntro && (<Introducton handleAction={this.closeIntro} />)}
        <h1 Style="text-align:center;  padding: 10px">
          RGB COLOUR GUESSING GAME
        </h1>
        {isGameOver && <GmaeOver totalScore={score}/>}
        {playing && (
          <div>
            <Settings
              isMuted={this.state.isMuted}
              handleMuteAction={this.setVolume}
            />
            <div className="score-board text-center">
              {/* <div>Level: {level}</div> */}
              <div>Score: {score}</div>
              <div>Trials Left: {trialsLeft}</div>
            </div>
            <Divider />
            <div className="game-wrapper">
              <div className="guess-content text-center">
                <h3>What colour is this?</h3>
                <h1 Style={isGameOver ? `color: ${guessColor}`: ''}>{guessColor}</h1>
              </div>
              <div className="game-pallete">
                <Timer time={timeLeft} />
                <Squares
                  colors = {colorOptions}
                  handleClick={this.checkColor}
                />
              </div>
            </div>
          </div>
        )}
        <div className="game-wrapper footer flex-wrapper flex-center">
          <button 
            className="default"
            onClick={this.showIntro}
          >
            NEED HELP?
          </button>
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
        {/* <div className="text-center page-link">
          <a href="http://www.hubkbs.com" target="_blank">
            Want to know more? Contact Hub KB.S
          </a>
        </div> */}
        <div className="text-right">
          <a href="https://github.com/ebenKB" className="custom-link" target="_blank">
            Made with <span role="img" aria-label="blue heart">💙</span> by ebenKB
          </a>
        </div>
      </div>
    )
  }
}

export default Game
