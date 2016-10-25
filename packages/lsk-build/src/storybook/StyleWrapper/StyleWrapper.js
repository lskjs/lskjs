import React, { Component, PropTypes } from 'react';

import s from './StyleWrapper.css';

export default class StyleWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.insertCss = styles => styles._insertCss();
  }

  getChildContext() {
    return {
      insertCss: this.insertCss,
    };
  }

  componentWillMount() {
    this.removeCss = this.insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    return this.props.children
  }
}
