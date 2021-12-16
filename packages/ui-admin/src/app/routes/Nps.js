import React, { Component } from 'react'
import NPSInput from '@kazukinagata/react-nps-typescript'
import '@kazukinagata/react-nps-typescript/dist/index.css'
import { trackEvent } from './SegmentHandler'
import { TextArea } from '@blueprintjs/core'

const NPS_KEY = 'bp/nps_after'

const npsDisplayRequirements = {
  // initialDelayMs: 1000 * 5, // five seconds FOR TESTING
  // scoredDelayMs: 1000 * 15, // 15 seconds FOR TESTING
  // promptedDelayMs: 1000 * 15 // 1 second FOR TESTING
  initialDelayMs: 1000 * 60 * 60 * 24 * 1, // one day
  scoredDelayMs: 1000 * 60 * 60 * 24 * 14, // 6 months, delay after user scored
  promptedDelayMs: 1000 * 60 * 60 * 24 * 14 // two days, delay before re-asking
}

const setCuttoff = delayTime => {
  const promptCuttoffTime = Date.now() + delayTime
  window.BP_STORAGE.set(NPS_KEY, promptCuttoffTime)
}

export class Nps extends Component {
  state = { score: null, dismissed: false, displayable: false, feedbackText: '' }
  //   state = { score: 5, dismissed: false, displayable: true, feedbackText: '' } // for testing

  componentDidMount = () => {
    const npsCuttoff = window.BP_STORAGE.get(NPS_KEY)
    if (!npsCuttoff) {
      setCuttoff(npsDisplayRequirements.initialDelayMs)
      return
    }
    if (Date.now() > npsCuttoff) {
      this.setState({ displayable: true })
      setCuttoff(npsDisplayRequirements.promptedDelayMs)
    }
  }

  onSubmit = score => {
    trackEvent('nps_scored', { npsScore: score })
    this.setState({ score })
    setCuttoff(npsDisplayRequirements.scoredDelayMs)
  }

  onDismissed = () => {
    this.setState({ dismissed: true })
  }

  handleChange = event => {
    this.setState({ feedbackText: event.target.value })
  }

  render() {
    if (!this.state.displayable) {
      return null
    }
    return (
      <NPSInput
        score={this.state.score}
        dismissed={this.state.dismissed}
        onSubmit={this.onSubmit}
        onDismissed={this.onDismissed}
      >
        <div>
           <p>Thank you for your feedbacks!</p>
          <TextArea growVertically={true} large={true} onChange={this.handleChange} value={this.state.feedbackText} />
        </div>
      </NPSInput>
    )
  }
}

export default Nps
