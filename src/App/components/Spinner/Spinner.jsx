import React, { Component } from 'react'
import importcss from 'importcss'

@importcss(require('./Spinner.css'))
export default class Spinner extends Component {
  render() {
    return <span styleName='outer'>
      <span styleName='root'>
        <span styleName='inner'>
          {this.props.children}
        </span>
      </span>
    </span>
  }
}
