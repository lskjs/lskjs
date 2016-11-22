import React, { Component } from 'react'
import importcss from 'importcss'

@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  render() {
    return <div styleName='root'>
      Welcome to HomePage
      <a href="/counter">Go to CounterPage</a>
    </div>
  }
}
