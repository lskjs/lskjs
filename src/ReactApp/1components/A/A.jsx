import React, { Component } from 'react';
import Link from '../Link';
import importcss from 'importcss';

@importcss(require('./A.css'))
export default class A extends Component {
  render() {
    const bsStyle = this.props.bsStyle || 'primary';
    const className = [
      this.props.className,
      this.props.styles && this.props.styles.A,
      this.props.styles && this.props.styles[`A_style_${bsStyle}`],
    ].filter(a => a).join(' ');
    return <Link {...this.props} className={className} href={this.props.href || this.props.to} />;
  }
}
