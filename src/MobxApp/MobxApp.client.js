import ReactApp from 'lego-starter-kit/ReactApp'
import routes from './routes';
import AppState from './AppState'
import { Provider } from 'mobx-react'

export default class MobxApp extends ReactApp {
  getUniversalRoutes() {
    return routes
  }

  appStateInstance = null
  getAppStateInstance(initialState) {
    if (!this.appStateInstance) {
      this.appStateInstance = this.getAppState(initialState)
    }
    return this.appStateInstance
  }

  getAppState() {
    return new AppState(window.__INITIAL_STATE__);
  }

  appComponent(props) {
    const { component } = props
    const initialState = window.__INITIAL_STATE__
    const appState = this.getAppStateInstance(initialState)
    const innerComponent = <Provider {...appState} appState={appState} children={component} />
    return super.appComponent({
      ...props,
      component: innerComponent,
    })
  }

  run() {
    return super.run()
  }
}
