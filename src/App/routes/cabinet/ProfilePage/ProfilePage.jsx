import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Card, CardBlock } from 'react-bootstrap';

@inject('user', 'auth')
@observer
export default class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  }
  render() {
    const { user, auth } = this.props;
    if (!auth.isAuth) return false;
    return (
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ marginTop: 20 }}>
            <CardBlock>
              <h3>{user.username}</h3>
              <p><b>Имя: </b>{user.profile.firstName}</p>
              <p><b>Фамилия: </b>{user.profile.lastName}</p>
              <p><b>Отчество: </b>{user.profile.middleName}</p>
              <hr />
              {user.profile.phone &&<p><b>Телефон: </b>{user.profile.phone}</p>}
              {user.profile.email && <p><b>Электронная почта: </b>{user.profile.email}</p>}
              {user.profile.city && <p><b>Город: </b>{user.profile.city}</p>}
              {user.profile.bdate && <p><b>Дата рождения: </b>{user.profile.bdate}</p>}
              <hr />
              <p><b>Пол: </b>{user.profile.sex || 'Не определился'}</p>
              <p><b>О себе: </b>{user.profile.about || 'Не указано'}</p>
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}
