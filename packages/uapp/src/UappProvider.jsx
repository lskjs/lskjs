import DefaultLinkProvider from '@lskjs/link/LinkProvider';
import { ThemeProvider as DefaultThemeProvider } from 'emotion-theming';
import { Provider as DefaultMobxProvider } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

const UappProvider = ({ app, page, children: rawChildren }) => {
  let children = <>{rawChildren}</>; // TODO: checks
  // console.log({ page });

  const { MobxProvider } = UappProvider;
  let stores;
  if (app && app.__providers) {
    stores = app.__providers;
  } else {
    stores = {};
  }
  if (stores && Object.keys(stores).length && MobxProvider) {
    children = (
      <MobxProvider {...stores} page={page}>
        {children}
      </MobxProvider>
    );
  }

  const { LinkProvider } = UappProvider;
  if (app && app.history && LinkProvider) {
    children = <LinkProvider onClick={(url) => app.history.push(url)}>{children}</LinkProvider>;
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
  app: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
UappProvider.MobxProvider = DefaultMobxProvider;
UappProvider.ThemeProvider = DefaultThemeProvider;
UappProvider.LinkProvider = DefaultLinkProvider;

export default UappProvider;
