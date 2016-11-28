import React, { Component } from 'react'
import importcss from 'importcss'
import A from '../../components/A'

@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  render() {
    return <div styleName='root'>
      Welcome to HomePageasdas
      <hr />
      <A href="/counter">Go to CounterPage</A>
    </div>
  }
}
