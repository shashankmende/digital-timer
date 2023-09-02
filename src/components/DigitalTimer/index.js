// Write your code here
import {Component} from 'react'
import './index.css'

let plusMinusContainer
class DigitalTimer extends Component {
  state = {defaultTime: 25, seconds: 0, isPaused: false, toDisplaySign: true}

  onClickResetBtn = () => {
    clearInterval(this.timerId)
    this.setState({
      isPaused: false,
      toDisplaySign: true,
      defaultTime: 25,
      seconds: 0,
    })
  }

  playPauseBtn = () => {
    let count = 60
    const {isPaused, seconds, toDisplaySign} = this.state
    let {defaultTime} = this.state
    this.setState({
      defaultTime,
      seconds,
      isPaused: !isPaused,
      toDisplaySign: false,
    })
    if (isPaused === false) {
      this.timerId = setInterval(() => {
        count -= 1
        if (count === 0) {
          count = 60
          defaultTime -= 1
        }

        this.setState({
          defaultTime: defaultTime - 1,
          seconds: count,
        })
      }, 1000)
    } else {
      this.setState({
        defaultTime,
        seconds,
      })
      clearInterval(this.timerId)
    }
  }

  onClickMinusBtn = () => {
    const {defaultTime} = this.state
    this.setState({
      defaultTime: defaultTime - 1,
    })
  }

  onClickPlusBtn = () => {
    const {defaultTime} = this.state
    this.setState({
      defaultTime: defaultTime + 1,
    })
  }

  render() {
    const {isPaused, defaultTime, toDisplaySign} = this.state
    let {seconds} = this.state
    const newDate = new Date(0, 0, 0, 0, defaultTime, 0)
    console.log('new date', newDate)
    if (seconds <= 9) {
      seconds = `0${seconds}`
    }

    if (toDisplaySign === false) {
      console.log('false =', isPaused)
      plusMinusContainer = (
        <div className="plus-minus-container">
          <button
            type="button"
            className="play-button minus-button"
            onClick={this.onClickMinusBtn}
            disabled
          >
            -
          </button>
          <p className="set-timer-value">25</p>
          <button
            type="button"
            className="play-button minus-button"
            onClick={this.onClickPlusBtn}
            disabled
          >
            +
          </button>
        </div>
      )
    } else {
      console.log('true = ', isPaused)
      plusMinusContainer = (
        <div className="plus-minus-container">
          <button
            type="button"
            className="play-button minus-button"
            onClick={this.onClickMinusBtn}
          >
            -
          </button>
          <p className="set-timer-value">25</p>
          <button
            type="button"
            className="play-button minus-button"
            onClick={this.onClickPlusBtn}
          >
            +
          </button>
        </div>
      )
    }

    console.log(defaultTime)
    const startPauseImgUrl = isPaused
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const pauseStartAlt = isPaused ? 'pause icon' : 'play icon'
    const btnText = isPaused ? 'Pause' : 'Start'
    const resultText = isPaused ? 'Running' : 'Paused'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-container">
          <div className="timer-results-container">
            <div className="result-container">
              <h1>
                {defaultTime}:{seconds}
              </h1>
              <p>{resultText}</p>
            </div>
          </div>
          <div>
            <div className="buttons-container">
              <div className="start-container">
                <button
                  type="button"
                  className="play-button"
                  onClick={this.playPauseBtn}
                >
                  <img
                    src={startPauseImgUrl}
                    alt={pauseStartAlt}
                    className="play-image"
                  />{' '}
                  {btnText}
                </button>
              </div>
              <div className="start-container">
                <button type="button" className="play-button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-image"
                    onClick={this.onClickResetBtn}
                  />{' '}
                  Reset
                </button>
              </div>
            </div>
            <div className="set-timer-container">
              <p>Set Timer limit</p>
              {plusMinusContainer}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
