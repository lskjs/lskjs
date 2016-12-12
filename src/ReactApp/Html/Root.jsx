import { Component, PropTypes } from 'react'
import { Provider } from 'react-tunnel'

import s from './Root.global.css'
export default class Root extends Component {
  static childContextTypes = {
    history: PropTypes.object.isRequired,
    insertCss: PropTypes.func.isRequired,
    rootState: PropTypes.object.isRequired,
    setRootState: PropTypes.func.isRequired,
    // provide: PropTypes.oneOfType([
    //   PropTypes.object,
    //   PropTypes.func,
    // ]),
  };
  styles = s;
  constructor(props) {
    super(props)
    this.state = props.ctx.rootState || {}
  }
  componentWillMount() {
    const { insertCss } = this.props;
    this.removeCss = insertCss && insertCss(this.styles);
  }
  componentWillUnmount() {
    this.removeCss && this.removeCss();
  }
  componentDidMount() {
    const html = document.getElementsByTagName("html")[0]
    html.className = html.className.replace('ua_js_no', 'ua_js_yes')
  }

  getChildContext() {
    return {
      history: this.props.ctx && this.props.ctx.history || (() => {}),
      insertCss: this.props.ctx && this.props.ctx.insertCss || (() => {}),
      rootState: this.state,
      // provide: this.props.ctx && (this.props.ctx.provider || this.props.ctx.stores) || {},
      setRootState: (...args) => {
        this.setState(...args);
      }
    };
  }
  render() {
    // console.log('AppWrapper render');
    const provider = this.props.ctx.provider
    return <Provider provide={provider.provide.bind(provider)}>
      {() => this.props.component}
    </Provider>
    //
    // return <div>
    //   {__DEV__ && <span>[{this.state.user && this.state.user.name}] HtmlRoot ({this.state.title})</span>}
    //   {this.props.component}
    // </div>
  }
}
