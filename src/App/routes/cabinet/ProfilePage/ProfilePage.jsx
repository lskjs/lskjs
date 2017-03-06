import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import { Card, CardBlock } from 'reactstrap';

@inject('user')
@observer
export default class ProfilePage extends Component {
  static defaultProps = {
    user: {},
  }
  static propTypes = {
    user: PropTypes.object,
  }
  render() {
    const user = this.props.user;
    return (
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ marginTop: 20 }}>
            <CardBlock>
              <h3>{user.username}</h3>
              <p><b>Имя: </b>{user.name}</p>
              <p><b>Фамилия: </b>{user.surname}</p>
              <p><b>Отчество: </b>{user.middlename}</p>
              <hr />
              <p><b>Телефон: </b>{user.info.phone || 'Нет телефона'}</p>
              <p><b>Компания: </b>{user.info.company || 'Нет компании'}</p>
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}
