import ReactApp from 'lego-starter-kit/ReactApp'
import routes from './routes'
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { Provider } from 'mobx-react'
import AppState from './AppState'

export default class MobxApp extends ReactApp {

  useRoutes() {
    this.app.all('/api', (req, res) => {
      return res.json({ message: 'Current api is here: /api/v1', url: '/api/v1' })
    })
    this.useStaticPublic(__dirname + '/public')
  }

  getUniversalRoutes() {
    return routes
  }

  getClientInitialState() {
    return {
      asd: 1231,
    }
  }

  appComponent(props) {
    // console.log('mobxapp appComponent');
    const { component, req } = props
    const initialState = { user: req.user, token: req.token, apiUrl: '/api/v1' };
    const appState = this.getAppState(initialState)
    const innerComponent = <Provider {...appState} appState={appState}>
      <div className="app-inner">
        {component}
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(appState.toJSON())}`}} />
      </div>
    </Provider>
    return super.appComponent({ ...props, component: innerComponent})
  }

  getAssets() {
    return assets.main
  }

  getAppState(initialState) {
    return new AppState(initialState)
  }

}
