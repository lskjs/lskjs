import React, { Component, PropTypes } from 'react'
import s from './App.css'
import DevTools from 'mobx-react-devtools'

export default class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setMeta: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      setTitle: context.setTitle || emptyFunction,
      setMeta: context.setMeta || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  render() {
    return (
      <div className='root'>
        <link
          rel='stylesheet'
          href='//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'
        />
        {/* <script src='//cdn.socket.io/socket.io-1.4.5.js'></script> */}
        <div>
          {this.props.children}
        </div>
        {__DEV__ ? <DevTools /> : ''}
      </div>
    );
  }
}
