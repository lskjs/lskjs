import { Component, PropTypes } from 'react';

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    insertCss: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    history: PropTypes.object.isRequired,
    insertCss: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      history: this.props.history,
      insertCss: this.props.insertCss,
    };
  }

  componentDidMount() {
    if (__CLIENT__) {
      const html = document.getElementsByTagName('html')[0];
      html.className = html.className.replace('ua_js_no', 'ua_js_yes');
    }
  }

  render() {
    return this.props.children;
  }
}
