import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DevTools from 'mobx-react-devtools';
import { Provider as DefaultProvider } from 'mobx-react';
import { ThemeProvider } from 'emotion-theming';
import NotificationSystem from '../NotificationSystem';
// import Loading from '@lskjs/general/Loading';

const DEBUG = false;

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor({ uapp }) {
    super();
    uapp.notificationSystem = React.createRef();
  }
  getChildContext() {
    return {
      history: this.props.history,
    };
  }
  Provider = DefaultProvider;
  ThemeProvider = ThemeProvider;

  render() {
    DEBUG && console.log('Root.render');

    const { uapp } = this.props;
    let { children } = this.props;

    children = (
      <React.Fragment>
        {children}
        <NotificationSystem ref={uapp.notificationSystem} />
        {__DEV__ && (
          <DevTools
            position={{
            bottom: 0,
            right: 20,
          }}
          />
        )}
      </React.Fragment>
    );

    DEBUG && console.log('Root.render2');


    const { Provider } = this;
    const stores = this.props.uapp && this.props.uapp.provide() || {};
    uapp.log.trace('uapp.provide', Object.keys(stores));
    if (stores && Object.keys(stores).length && Provider) {
      DEBUG && console.log('Root.render3 @@@@');
      children = (
        <Provider {...stores}>
          {children}
        </Provider>
      );
    }
    DEBUG && console.log('Root.render4');

    const { ThemeProvider } = this;
    const { theme } = uapp;
    if (theme && ThemeProvider) {
      DEBUG && console.log('Root.render2 @@@@');
      children = (
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      );
    }
    DEBUG && console.log('Root.render3');

    return children;
  }
}
