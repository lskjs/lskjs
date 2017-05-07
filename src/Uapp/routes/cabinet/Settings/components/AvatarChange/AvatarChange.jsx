import React, { PropTypes } from 'react';
import Component from 'lsk-general/General/Component';
import Avatar from 'lsk-general/General/Avatar';
import { autobind } from 'core-decorators';
import Dropzone from 'react-dropzone';
import { inject, observer } from 'mobx-react';
import css from 'importcss';
import {
  Card,
  CardBlock,
  CardHeader,
  CardFooter,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

@inject(s => ({
  user: s.user,
  upload: s.uapp.modules.upload,
}))
@observer
@css(require('./AvatarChange.css'))
export default class AvatarChange extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  state = {
    files: null,
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     files: null,
  //   };
  // }

  @autobind
  onDrop(files) {
    this.setState({ files });
  }

  @autobind
  async acceptSelect() {
    const { files } = this.state;
    const { upload, user } = this.props;
    if (!upload) return false;
    const data = new FormData();
    data.append('file', files[0]);
    const avatar = await upload.uploadImage(data);
    // console.log(avatar);
    await user.editUser({
      profile: {
        avatar: avatar.path,
      },
    });
    this.setState({ files: null });
  }
  @autobind
  cancelSelect() {
    this.setState({ files: null });
  }

  render() {
    const { files } = this.state;
    const { user, upload } = this.props;
    return (
      <Card style={{ margin: '10px 0' }}>
        <CardHeader>
          Аватар
        </CardHeader>
        <CardBlock>
          {/* <CardTitle>Изменить аватар</CardTitle> */}
          <Row>
            <Col xs={upload ? 6 : 12} sm={upload ? 6 : 12} styleName="inner center">
              <b>Твой аватар</b>
              <Avatar
                size={200}
                src={user.avatar}
                title={user.fullName}
              />
            </Col>
            <If condition={upload}>
              <Col xs={6} sm={6} styleName="inner center">
                <b>Новый аватар</b>
                <If condition={files && files.length}>
                  {files.map((file, index) => (
                    <Avatar
                      key={index}
                      src={file.preview}
                      title={user.fullName}
                    />
                  ))}
                </If>
                <If condition={!(files && files.length)}>
                  <Dropzone
                    multiple={false}
                    styleName="zone"
                    ref={(e) => { this.dropzone = e; }}
                    onDrop={this.onDrop}
                  >
                    <div>
                      <b>Изменить аватар</b>
                      <p>Переместите сюда изображение или нажмите на кнопку</p>
                      <button>
                        Загрузить изображение
                      </button>
                    </div>
                  </Dropzone>
                </If>
              </Col>
            </If>
          </Row>
        </CardBlock>
        <If condition={files && files.length}>
          <CardFooter>
            <Row>
              <Col xs={6} sm={6} styleName="inner center">
                <Button bsStyle="primary" onClick={this.acceptSelect}>Заменить</Button>
              </Col>
              <Col xs={6} sm={6} styleName="inner center">
                <Button onClick={this.cancelSelect}>Отменить</Button>
              </Col>
            </Row>
          </CardFooter>
        </If>
      </Card>
    );
  }
}
