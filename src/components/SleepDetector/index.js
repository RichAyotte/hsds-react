import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utilities/other'

class SleepDetector extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    this.clearInterval()
    const { interval, buffer } = this.props

    const intervalId = setInterval(() => {
      const { onWake } = this.props
      const { lastRun } = this.state
      const now = Date.now()
      const delayTime = now - lastRun - interval
      if (delayTime > buffer) {
        onWake(delayTime)
      }
      this.setState({ lastRun: Date.now() })
    }, interval)

    const lastRun = Date.now()
    this.setState({ intervalId, lastRun })
  }

  componentWillUnmount() {
    this.clearInterval()
  }

  clearInterval() {
    const { intervalId } = this.state
    clearInterval(intervalId)
  }

  render() {
    return null
  }
}

SleepDetector.propTypes = {
  buffer: PropTypes.number,
  interval: PropTypes.number,
  onWake: PropTypes.func.isRequired,
}

SleepDetector.defaultProps = {
  buffer: 5000,
  interval: 10000,
  onWake: noop,
}

export default SleepDetector
