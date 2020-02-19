import React from 'react';
import PropTypes from 'prop-types';
import { Provider as DefaultMobxProvider } from 'mobx-react';
import { ThemeProvider as DefaultThemeProvider } from 'emotion-theming';

const UappProvider = ({ uapp, children: rawChildren }) => {
  let children = <>{rawChildren}</>;

  const { MobxProvider } = this;
  const stores = (uapp && uapp.provide()) || {};
  if (stores && Object.keys(stores).length && MobxProvider) {
    children = <MobxProvider {...stores}>{children}</MobxProvider>;
  }

  const { ThemeProvider } = this;
  const { theme } = uapp;
  if (theme && ThemeProvider) {
    children = <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return children;
};

UappProvider.propTypes = {
  uapp: PropTypes.instanceOf(PropTypes.object).isRequired,
  children: PropTypes.node.isRequired,
};
UappProvider.MobxProvider = DefaultMobxProvider;
UappProvider.ThemeProvider = DefaultThemeProvider;
