import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider as DefaultMobxProvider } from 'mobx-react';
import { ThemeProvider as DefaultThemeProvider } from 'emotion-theming';

export default class UappProvider extends Component {
  static propTypes = {
    uapp: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };
  MobxProvider = DefaultMobxProvider;
  ThemeProvider = DefaultThemeProvider;
  render() {
    const { uapp } = this.props;
    let { children } = this.props;

    children = (
      <React.Fragment>
        {children}
      </React.Fragment>
    );

    const { MobxProvider } = this;
    const stores = uapp && uapp.provide() || {};
    if (stores && Object.keys(stores).length && MobxProvider) {
      children = (
        <MobxProvider {...stores}>
          {children}
        </MobxProvider>
      );
    }

    const { ThemeProvider } = this;
    const { theme } = uapp;
    if (theme && ThemeProvider) {
      children = (
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      );
    }

    return children;
  }
}
