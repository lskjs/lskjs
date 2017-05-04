import React, { Component, PropTypes } from 'react';
import { inject } from 'mobx-react';
import omit from 'lodash/omit';
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
import Avatar from '~/App/components/Avatar';

@inject(stores => ({
  myUser: stores.user,
  profile: stores.config.auth.profile,
  Messages: stores.uapp.modules.chat.components.Messages,
}))
@css(require('./User.css'))
export default class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    myUser: PropTypes.object.isRequired,
    Messages: PropTypes.node.isRequired,
    profile: PropTypes.object.isRequired,
  };
  getFields(obj, user) {
    return Object.keys(obj)
      .map(key => ({
        name: `profile.${key}`,
        value: user.profile[key],
        ...omit(obj[key], 'validate'),
      }));
  }
  render() {
    const { profile, user, myUser, Messages } = this.props;
    return (
      <Row>
        <Col xs={12} styleName="center">
          <Avatar
            size={200}
            src={user.avatar}
            title={user.fullName}
          />
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
              Информация о пользователе
            </CardHeader>
            <CardBlock>
              {this.getFields(profile, user).map((obj) => {
                if (obj.value) {
                  return <p key={obj.name}><strong>{`${obj.title}: `}</strong>{obj.value}</p>;
                }
                return false;
              })}
            </CardBlock>
          </Card>
        </Col>
        <Col md={6} xs={12}>
          <Card style={{ margin: '10px 0' }}>
            <CardHeader>
              Комментарии
            </CardHeader>
            <CardBlock>
              <Messages subjectType="User" subjectId={user._id} />
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}
