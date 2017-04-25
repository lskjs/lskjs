import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import omit from 'lodash/omit';
import { Row, Col, Button, Card, CardBlock } from 'react-bootstrap';
import cx from 'classnames';

import Loading from 'react-icons2/md/refresh';
import Error from 'react-icons2/md/clear';
import Check from 'react-icons2/md/check';
import Component from 'lsk-general/General/Component';
import Form from 'lsk-general/General/Form';

import PasswordChange from './components/PasswordChange';
import AvatarChange from './components/AvatarChange';
import SocialChange from './components/SocialChange';

@inject('user', 'config', 'log')
@observer
export default class Settings extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  };
  getFields(obj, user) {
    return Object.keys(obj)
      .map(key => ({
        name: `profile.${key}`,
        value: user.profile[key],
        ...omit(obj[key], 'validate'),
      }));
  }
  getValidators(obj) {
    const validators = {};
    for (const key in obj) {
      if (obj[key].validate) {
        validators[`profile.${key}`] = obj[key].validate;
      }
    }
    return validators;
  }
  @autobind
  async handleSubmit(data) {
    await this.props.user.editUser(data);
  }
  render() {
    const { config, user } = this.props;
    return (
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ margin: '10px 0' }}>
            <CardBlock>
              <h4>Редактирование</h4>
              <Form
                fields={this.getFields(config.auth.profile, user)}
                validators={this.getValidators(config.auth.profile)}
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
          <SocialChange />
        </Col>
        <Col md={6} xs={12}>
          <AvatarChange />
          <PasswordChange />
        </Col>
      </Row>
    );
  }
}
