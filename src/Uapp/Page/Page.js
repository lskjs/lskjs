import PageBase from 'lego-starter-kit/Uapp/Page';
import Root from '../Root';

export default class Page extends PageBase {

  Root = Root;

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
`;
  }

  renderFooter() {
    return `\
${super.renderFooter()}
${__PROD__ ? require('raw!./footer.html') : ''}
`;
  }

}
