import React, { Component } from 'react'
import importcss from 'importcss'
import A from '../../components/A'

@importcss(require('./CounterPage.css'))
export default class CounterPage extends Component {
  constructor() {
    super()
    this.state = {
      counter: 10,
    }
  }
  handleChange(change) {
    return () => {
      this.setState({
        counter: this.state.counter + change
      })
    }
  }
  render() {
    return <div styleName='root'>
      Welcome to CounterPage
      <h1>{this.state.counter}</h1>
      <button onClick={this.handleChange(-1)}>
        -1
      </button>
      <button onClick={this.handleChange(1)}>
        +1
      </button>
      <hr />
      <A href="/">Go to HomePage</A>
    </div>
  }
}
