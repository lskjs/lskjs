import HtmlBase from 'lego-starter-kit/ReactApp/Html'
import { Provider } from 'mobx-react'
import ToastContainer from '../components/ToastContainer'

require('./bootstrap.g.scss')
require('./Html.global.css')

export class Root extends HtmlBase.Root {
  render() {
    const { ctx, component } = this.props;
    const stores = ctx.provider && ctx.provider.provide() || ctx.stores || {};
    return (
      <Provider {...stores}>
        <div>
          {component}
          <ToastContainer />
        </div>
      </Provider>
    );
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
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
`
  }

  renderFooter() {
    return `\
${super.renderFooter()}
${__PROD__ ? require('raw!./footer.html') : ''}
`
  }

}
