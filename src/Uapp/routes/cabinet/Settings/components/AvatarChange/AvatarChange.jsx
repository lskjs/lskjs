import React, { PropTypes } from 'react';
import Component from 'lsk-general/General/Component';
import Avatar from '~/App/components/Avatar';
import { autobind } from 'core-decorators';
import Dropzone from 'react-dropzone';
import { inject, observer } from 'mobx-react';
import css from 'importcss';
import {
  Card,
  CardBlock,
  CardTitle,
  CardHeader,
  CardFooter,
  Row,
  Col,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';

@inject(s => ({
  user: s.user,
  api: s.api,
  uploadImage: s.uapp.modules.upload.uploadImage,
}))
@observer
@css(require('./AvatarChange.css'))
export default class AvatarChange extends Component {

  static propTypes = {
    api: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      files: null,
    };
  }

  @autobind
  onDrop(files) {
    this.setState({ files });
  }

  @autobind
  async acceptSelect() {
    const { files } = this.state;
    const { uploadImage, user } = this.props;

    const data = new FormData();
    data.append('file', files[0]);
    const avatar = await uploadImage(data);
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
    const { user } = this.props;
    return (
      <Card style={{ margin: '10px 0' }}>
        <CardHeader>
          Изменить аватар
        </CardHeader>
        <CardBlock>
          {/* <CardTitle>Изменить аватар</CardTitle> */}
          <Row>
            <Col xs={6} sm={6} styleName="inner center">
              <b>Текущий аватар</b>
              <Avatar
                src={user.avatar}
                title={user.fullName}
              />
            </Col>
            <Col xs={6} sm={6} styleName="inner center">
              <b>Изменить аватар</b>
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
                    <p>Переместите сюда изображение или нажмите что бы выбрать</p>
                    <button>
                      Загрузить изображение
                    </button>
                  </div>
                </Dropzone>
              </If>
            </Col>
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
