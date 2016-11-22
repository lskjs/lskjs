import {Component, PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import Dropzone from 'react-dropzone'
import {Button, FormControl, Input, Glyphicon} from 'react-bootstrap'

@CSSModules(require('./Uploader.css'), {
  allowMultiple: true,
  errorWhenNotFound: false
})
export default class Uploader extends Component {
  static propTypes = {};

  onDrop(files) {
    console.log('Received files: ', files);
    console.log('Received files name: ', files[0].name);
    // this.setState({files: files});
    this.state({files: files});
  }

  render() {
    return (
      <div styleName="filepicker dropzone dz-clickable">
        <div styleName="dz-default dz-message">

          <span>
            Загрузить изображения</span>

        </div>

        <div styleName="preview">
          <Dropzone onDrop={this.onDrop}>

            <p>asdasdasd</p>

            {/*   <div styleName="dz-preview dz-processing dz-image-preview dz-success dz-complete">
                <div styleName="dz-image">
                  <img  src="https://media.cackle.me/3/45/8ae80124fc8c9706e698ef9929be8453.jpg"/>
                  <a styleName="dz-remove">X</a>
                </div>
             <div styleName="dz-progress">progress</div>
                <div styleName="dz-error-message">error message</div>
                <div styleName="dz-success-mark"> mark</div>
                <div styleName="dz-error-mark">error mark</div>

                <FormControl styleName="dz-link" componentClass="input" value="im generated link"/>
                <Button bsStyle="warning"><Glyphicon glyph="link" /></Button>
              </div>

              <div styleName="dz-copy">
                <Button bsStyle="warning" ><Glyphicon glyph="link" /> Скопировать все </Button>
              </div>*/}
          </Dropzone>

            <If condition={!!this.state.files}>}
            <div>{this.state.files.map((file) => <img src={file.preview}/>)}</div>
          </If>
        </div>

        <div styleName="dz-bottom">
          <Button bsStyle='default'>Выберите файл</Button>
          <Button type='submit' bsStyle='success'>Сохранить</Button>
        </div>
      </div>
    )
  }
}
