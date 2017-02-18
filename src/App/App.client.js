import ReactApp from 'lego-starter-kit/ReactApp';

export default class App extends ReactApp {

  static Html = require('./Html').default
  Provider = require('./stores/AppStore').default

  getModels() {
    return {};
    // return require('./models').default(this)
  }

  getUniversalRoutes() {
    return require('./routes').default; // eslint-disable-line
  }

  hmrInit() {
    if (module.hot) {
      module.hot.accept('./routes', () => {
        this.hmrUpdate();
      });
    }
  }

  async run() {
    this.models = this.getModels();
    const res = await super.run();
    // console.log('this.Provider', this.provider.auth.init());

    return res
  }

}
