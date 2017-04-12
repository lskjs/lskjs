import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import {
  Button,
  Row,
  Col,
  Card,
  CardBlock,
  CardHeader,
} from 'react-bootstrap';
import css from 'importcss';
import Edit from 'react-icons2/mdi/account-settings';
import Link from 'lsk-general/General/Link';

@inject(stores => ({
  myUser: stores.user,
  // stores,
  Messages: stores.uapp.modules.chat.components.Messages,
}))
@css(require('./User.css'))
export default class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  render() {
    const { user, myUser, Messages } = this.props;
    // console.log({stores});
    return (
      <Row>
        <Col xs={12} styleName="center">
          <img styleName="avatar" src={user.avatar} alt={user.fullName} />
          <h3>{user.fullName}</h3>
          <If condition={user._id === myUser._id}>
            <Link href="/cabinet/settings">
              <Button bsStyle="warning" bsSize="small">
                <Edit /> Редактировать профиль
              </Button>
            </Link>
          </If>
        </Col>
        <Col md={6} xs={12}>
          <Card style={{ margin: '10px 0' }}>
            <CardHeader>
              Основное
            </CardHeader>
            <CardBlock>
              <p><b>Юзернейм: {user.username}</b></p>
              <p><b>Имя: </b>{user.profile.firstName}</p>
              <p><b>Фамилия: </b>{user.profile.lastName}</p>
              <p><b>Отчество: </b>{user.profile.middleName}</p>
              {user.profile.city && <p><b>Город: </b>{user.profile.city}</p>}
              {user.profile.bdate && <p><b>Дата рождения: </b>{user.profile.bdate}</p>}
              <p><b>Пол: </b>{user.profile.sex || 'Не определился'}</p>
              <p><b>О себе: </b>{user.profile.about || 'Не указано'}</p>
            </CardBlock>
          </Card>
        </Col>
        <Col md={6} xs={12}>
          {/* <Messages title="Комментарии" subjectType="User" subjectId={user._id} /> */}
          <Card style={{ margin: '10px 0' }}>
            <CardHeader>
              Комментарии
            </CardHeader>
            <CardBlock>
              <Messages subjectType="User" subjectId={user._id} />
            </CardBlock>
          </Card>
          {['phone', 'email'].includes(user.profile) && (
            <Card style={{ margin: '10px 0' }}>
              <CardHeader>
                Контактная информация
              </CardHeader>
              <CardBlock>
                {user.profile.phone && <p><b>Телефон: </b>{user.profile.phone}</p>}
                {user.profile.email && <p><b>Электронная почта: </b>{user.profile.email}</p>}
              </CardBlock>
            </Card>
          )}
        </Col>
      </Row>
    );
  }
}
