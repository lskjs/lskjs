import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import css from 'importcss';

@inject('user') @observer
@css(require('./Profile.css'))
export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  render() {
    const { user } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <div styleName="header">
            <img
              alt={user.firstName}
              src={'https://remont3.ru/templates/umedia/dleimages/noavatar.png'}
            />
            <div styleName="header-info">
              <h3>{user.firstName}</h3>
              <p><b>Email</b>{user.username}</p>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
