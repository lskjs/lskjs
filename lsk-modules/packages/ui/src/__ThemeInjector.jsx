import React, { PureComponent } from 'react';
import { ThemeProvider } from 'emotion-theming';
import PropTypes from 'prop-types';
import theme from './utils/theme';

class ThemeInjector extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    );
  }
}

export default ThemeInjector;
