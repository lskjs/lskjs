import {Component, PropTypes} from 'react'

// @CSSModules(require('./Test.css'), {
//   allowMultiple: true,
//   errorWhenNotFound: false
// })
LegoStyle

@LegoStyle(require('./Test.css'))
export default class Test extends Component {
  static propTypes = {};


  render() {
    return (
      <div styleName="root dropzone dz-clickable">
        <div styleName="dz-default dz-message">

          <span>
            Загрузить изображения</span>

        </div>

      </div>
    )
  }
}
