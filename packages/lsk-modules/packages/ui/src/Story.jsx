import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import defaultTheme from './theme';
import Performance from './DEV/Performance';
import './styles.g.css';

class Story extends Component {
  componentDidMount() {
    window.story = this;
    if (window.parent) window.parent.story = this;
  }
  render() {
    const {
      children, devtools, locale = 'en', theme = defaultTheme, style,
    } = this.props;
    const api = {
      fetch: (...args) => console.log('api.get', ...args),
    };
    const t = (a) => {
      return a === 'locale' ? locale : a;
    };
    const i18 = { t };
    const config = {};
    const uapp = {
      i18,
      t,
      config,
      api,
      modules: {
        upload: {
          uploadFile: async () => ({ url: 'https://picsum.photos/1280/720/?random' }),
        },
        billing: {
          stores: {
            Transactions: {
              getCardTokenSign: () => {},
            },
          },
        },
      },
      onError: e => console.error(e),
      provide: () => ({
        t,
        config,
        i18,
        uapp,
        api,
      }),
    };
    return (
      <Performance>
        <ThemeProvider theme={theme}>
          <Provider
            uapp={uapp}
            {...uapp.provide()}
          >
            <div
              style={{
              border: '30px #eee solid',
              // width: '80%',
              // fontFamily: 'Gotham Pro',
              // padding: '10px',
              ...style,
            }}
            >
              {children}
              {devtools && <DevTools />}
            </div>
          </Provider>
        </ThemeProvider>
      </Performance>

    );
  }
}

export default Story;
