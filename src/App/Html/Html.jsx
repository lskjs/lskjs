import HtmlBase from 'lego-starter-kit/ReactApp/Html'
import { Provider } from 'mobx-react'
import ToastContainer from '../components/ToastContainer'

require('./bootstrap.g.scss')
require('./Html.global.css')

export class Root extends HtmlBase.Root {
  render() {
    const stores = this.props.ctx.provider && this.props.ctx.provider.provide() || this.props.ctx.stores || {}
    return <Provider { ...stores } >
      <div>
        {this.props.component}
        <ToastContainer />
      </div>
    </Provider>
  }
}

export default class Html extends HtmlBase {

  static Root = Root;
  // renderStyle() {
  //   return `<style id="css"></style>`
  // }

  renderHead() {
    // <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet"/>
    // <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.5/css/bootstrap-flex.min.css" rel="stylesheet"/>
    // <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
    return `\
${super.renderHead()}

`
  }

  renderFooter() {
    return `\
${super.renderFooter()}
${require('raw!./footer.html')}
`
  }

}
