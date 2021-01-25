import DefaultLinkProvider from '@lskjs/link/LinkProvider';
import { ThemeProvider as DefaultThemeProvider } from 'emotion-theming';
import { Provider as DefaultMobxProvider } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

const UappProvider = ({ uapp, children: rawChildren }) => {
  let children = <>{rawChildren}</>;

  const { MobxProvider } = UappProvider;
  let stores;
  if (uapp && uapp.__providers) {
    stores = uapp.__providers;
  } else {
    stores = {};
  }
  if (stores && Object.keys(stores).length && MobxProvider) {
    children = <MobxProvider {...stores}>{children}</MobxProvider>;
  }

  const { LinkProvider } = UappProvider;
  if (uapp && uapp.history && LinkProvider) {
    children = <LinkProvider onClick={(url) => uapp.history.push(url)}>{children}</LinkProvider>;
  }

  const { theme } = stores;
  const { ThemeProvider } = UappProvider;
  if (theme && ThemeProvider) {
    children = <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return children;
};

UappProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  uapp: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
UappProvider.MobxProvider = DefaultMobxProvider;
UappProvider.ThemeProvider = DefaultThemeProvider;
UappProvider.LinkProvider = DefaultLinkProvider;

export default UappProvider;
