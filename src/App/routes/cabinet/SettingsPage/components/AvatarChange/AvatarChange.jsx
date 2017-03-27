import React, { PropTypes } from 'react';
import Component from 'lsk-general/General/Component';
import { autobind } from 'core-decorators';
import Dropzone from 'react-dropzone';
import { inject } from 'mobx-react';
import css from 'importcss';
import {
  Card,
  CardBlock,
  Row,
  Col,
  Button,
  ButtonToolbar
} from 'react-bootstrap';

@inject('user', 'api')
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
    const { api, user } = this.props;

    const data = new FormData();
    data.append('file', files[0]);
    const avatar = await api.uploadImage(data);
    console.log(avatar);
    await user.editUser({
      profile: {
        avatar: avatar.path,
      },
    });
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
        <CardBlock>
          <h4>Изменить аватар</h4>
          <Row>
            <Col xs={12} sm={6} styleName="inner center">
              <b>Текущий аватар</b>
              <img
                src={user.profile.avatar}
                alt={user.fullName} title={user.fullName}
                style={{ borderRadius: '50%' }}
              />
            </Col>
            <Col xs={12} sm={6} styleName="inner center">
              <b>Новый аватар</b>
              <Dropzone
                multiple={false}
                styleName="zone"
                ref={(e) => { this.dropzone = e; }}
                onDrop={this.onDrop}
              >
                <div>Переместите сюда изображение или нажмите что бы выбрать</div>
              </Dropzone>
            </Col>
            {files && (
              <Col xs={12} styleName="inner center top">
                <b>Предварительный просмотр</b>
                <div styleName="files">
                  {files.length === 1 && (
                    <ButtonToolbar styleName="confirm">
                      <Button bsStyle="primary" onClick={this.acceptSelect}>Сохранить</Button>
                    </ButtonToolbar>
                  )}
                  {files.map((file, index) => (
                    <img key={index} alt="" src={file.preview} />
                  ))}
                  {files.length === 1 && (
                    <ButtonToolbar styleName="confirm">
                      <Button onClick={this.cancelSelect}>Отменить</Button>
                    </ButtonToolbar>
                  )}
                </div>
              </Col>
            )}
          </Row>
        </CardBlock>
      </Card>
    );
  }
}
