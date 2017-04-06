import React, { Component, PropTypes } from 'react';
import {
  Row,
  Col,
  Card,
  CardBlock,
  CardHeader,
} from 'react-bootstrap';
import css from 'importcss';

@css(require('./User.css'))
export default class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  render() {
    const { user } = this.props;
    return (
      <Row>
        <Col xs={12} styleName="center">
          <img styleName="avatar" src={user.avatar} alt={user.fullName} />
          <h3>{user.fullName}</h3>
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
            </CardBlock>
          </Card>
        </Col>
        <Col md={6} xs={12}>
          <Card style={{ margin: '10px 0' }}>
            <CardHeader>
              О себе
            </CardHeader>
            <CardBlock>
              {user.profile.about || 'Не указано'}
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
