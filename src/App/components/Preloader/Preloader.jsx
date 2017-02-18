import React, { Component } from 'react'
import importcss from 'importcss'

@importcss(require('./Preloader.css'))
export default class Preloader extends Component {
  render() {
    return <div styleName='root'>
      {/* Preloader */}
      <img src='//cdn.mgbeta.ru/qblocks/2GwjX9KalkABnJGd5_7soqm0zKU.gif' />
    </div>
  }
}
