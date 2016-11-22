import { Component, PropTypes } from 'react'
export default class AppWrapper extends Component {
  static childContextTypes = {
    history: PropTypes.object.isRequired,
    insertCss: PropTypes.func.isRequired,
  };
  getChildContext() {
    return {
      history: this.props.context.history || (() => {}),
      insertCss: this.props.context.insertCss || (() => {}),
    };
  }
  render() {
    // console.log('AppWrapper render');
    return this.props.children
  }
}
