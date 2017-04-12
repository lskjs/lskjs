import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { Row, Col, Button, Card, CardBlock } from 'react-bootstrap';
import cx from 'classnames';

import Loading from 'react-icons2/md/refresh';
import Error from 'react-icons2/md/clear';
import Check from 'react-icons2/md/check';
import Component from 'lsk-general/General/Component';
import Form from 'lsk-general/General/Form';

import PasswordChange from './components/PasswordChange';
import AvatarChange from './components/AvatarChange';

@inject('user')
@observer
export default class Settings extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  @autobind
  async handleSubmit(data) {
    await this.props.user.editUser(data);
  }
  render() {
    const { user } = this.props;
    const fields = [
      {
        name: 'username',
        title: 'Почта',
        value: user.username,
        control: {
          placeholder: 'Например, utkin@mail.ru',
        },
      },
      {
        name: 'profile.firstName',
        title: 'Имя',
        value: user.profile.firstName,
        control: {
          placeholder: 'Например, Василий',
        },
      },
      {
        name: 'profile.lastName',
        title: 'Фамилия',
        value: user.profile.lastName,
        control: {
          placeholder: 'Например, Пушкин',
        },
      },
      {
        name: 'profile.middleName',
        title: 'Отчество',
        value: user.profile.middleName,
        control: {
          placeholder: 'Например, Александрович',
        },
      },
      // {
      //   name: 'profile.phone',
      //   title: 'Телефон',
      //   value: user.profile.phone,
      //   control: {
      //     placeholder: 'Например, 927000000',
      //   },
      // },
      // {
      //   name: 'profile.email',
      //   title: 'Электронная почта для связи',
      //   value: user.profile.email,
      //   control: {
      //     placeholder: 'E-mail для связи',
      //   },
      // },
      // {
      //   name: 'profile.city',
      //   title: 'Город',
      //   value: user.profile.city,
      //   control: {
      //     placeholder: 'Откуда вы?',
      //   },
      // },
      // {
      //   name: 'profile.about',
      //   title: 'О себе',
      //   value: user.profile.about,
      //   control: {
      //     placeholder: 'Расскажите о себе',
      //   },
      // },
    ];
    return (
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ margin: '10px 0' }}>
            <CardBlock>
              <h4>Редактирование</h4>
              <Form
                fields={fields}
                onSubmit={this.handleSubmit}
                submitButton={(
                  <Button
                    type="submit"
                    bsStyle="primary"
                    style={{
                      position: 'relative',
                    }}
                  >
                    Сохранить
                  </Button>
                )}
              />
            </CardBlock>
          </Card>
        </Col>
        <Col md={6} xs={12}>
          <AvatarChange />
          <PasswordChange />
        </Col>
      </Row>
    );
  }
}
