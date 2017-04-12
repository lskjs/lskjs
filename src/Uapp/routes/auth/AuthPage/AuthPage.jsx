import React, { PropTypes } from 'react';
import importcss from 'importcss';
import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';
import {
  Card,
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { get } from 'lodash';

import Loading from 'react-icons2/md/refresh';
import Error from 'react-icons2/md/clear';
import Check from 'react-icons2/md/check';

import Component from 'lsk-general/General/Component';
import Slide from '../../Slide';
import Link from 'lsk-general/General/Link';
import A from 'lsk-general/General/A';
import Form from 'lsk-general/General/Form';

import SocialButtons, { SocialButton, buttons } from './SocialButtons';

@inject('auth', 'config')
@observer
@importcss(require('./AuthPage.css'))
export default class AuthPage extends Component {

  static defaultProps = {
    type: 'login',
    passport: {},
  }

  static propTypes = {
    type: PropTypes.string,
    passport: PropTypes.object,
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }

  getFields(type) {
    const login = {
      name: 'login',
      title: 'Email',
      control: {
        placeholder: 'Ваш Email',
      },
    };
    const password = {
      name: 'password',
      title: 'Пароль',
      control: {
        type: 'password',
        placeholder: 'Ваш пароль',
      },
    };

    if (type === 'recovery') {
      return [login];
    }

    if (type === 'login') {
      return [
        login,
        {
          ...password,
          help: (
            <div style={{ textAlign: 'right' }}>
              <A href="/auth/recovery">
                Забыли пароль?
              </A>
            </div>
          ),
        },
      ];
    }

    const config = this.props.config;
    const infoFields = config.auth.signup
    .map(name => ({ name, ...config.auth.profile[name] }))
    .filter(f => f)
    .map(field => ({
      name: `profile.${field.name}`,
      title: field.title,
      control: field.control || {},
    }));

    if (type === 'signupPassport') {
      return [
        ...infoFields,
      ].map(field => ({
        ...field,
        value: get(this.props.passport, field.name),
      }));
    }

    return [
      login,
      password,
      ...infoFields,
    ];
  }

  @autobind
  async handleSubmit(data) {
    const { type, auth, query } = this.props;
    if (type === 'login') {
      const res = await auth.login(data);
      if (res.message === 'ok') {
        this.redirect('/');
      }
    }
    if (type === 'signupPassport') {
      await auth.signupPassport({ ...data, p: query.p }).then(() => {
        this.redirect('/');
      });
    }
    if (type === 'signup') {
      await auth.signup(data).then(() => {
        this.redirect('/');
      });
    }
    if (type === 'recovery') {
      await auth.recovery(data);
      global.toast && global.toast({
        type: 'success',
        title: 'Письмо с восстановлением пароля отправлено на почту.',
      });
    }
  }


  render() {
    const { type, auth, config, passport } = this.props;
    const fields = this.getFields(type);
    return (
      <Slide>
        <Grid>
          <Row>
            <Col md={4} mdOffset={4}>
              <Card>
                <CardBlock>
                  <CardTitle>
                    <If condition={type === 'login'}>
                      Вход
                    </If>
                    <If condition={['signupPassport', 'signup'].includes(type)}>
                      {`Регистрация${type === 'signupPassport' ? ` через ${buttons[passport.provider].title}` : ''}`}
                    </If>
                    <If condition={type === 'recovery'}>
                      Восстановить пароль
                    </If>
                  </CardTitle>
                  <If condition={type == 'signupPassport'}>
                    <SocialButton name={passport.provider} />
                    <div style={{ textAlign: 'center' }}>
                      <img src={passport.profile.avatar} style={{ borderRadius: '50%' }} />
                    </div>
                  </If>
                  <Form
                    fields={fields}
                    validators={{
                      login: {
                        presence: {
                          message: 'Поле не должно быть пустым.',
                        },
                        email: {
                          message: 'Введите корректный адрес почты.',
                        },
                      },
                      password: {
                        presence: {
                          message: 'Поле не должно быть пустым',
                        },
                        length: {
                          minimum: 6,
                          message: 'Пароль должен быть больше 6 символов.',
                        },
                      },
                      'profile.firstName': {
                        presence: {
                          message: 'Поле не должно быть пустым',
                        },
                      },
                      'profile.lastName': {
                        presence: {
                          message: 'Поле не должно быть пустым',
                        },
                      },
                      'profile.middleName': {
                        presence: {
                          message: 'Поле не должно быть пустым',
                        },
                      },
                    }}
                    onSubmit={this.handleSubmit}
                    submitButton={(
                      <Button
                        type="submit"
                        bsStyle="primary"
                        style={{
                          position: 'relative',
                        }}
                      >
                        <span>
                          <If condition={type === 'login'}>
                            Войти
                          </If>
                          <If condition={['signupPassport', 'signup'].includes(type)}>
                            Создать аккаунт
                          </If>
                          <If condition={type === 'recovery'}>
                            Сбросить пароль
                          </If>
                        </span>
                      </Button>
                    )}
                  />
                </CardBlock>
                <CardFooter className="text-xs-center">
                  <SocialButtons auth={auth} config={config} />
                </CardFooter>
              </Card>
              <If condition={type === 'signup'}>
                <Card>
                  <CardBlock className="text-xs-center" style={{ textAlign: 'center' }}>
                    <CardText>У вас уже есть аккаунт?</CardText>
                    <Button
                      componentClass={Link}
                      href="/auth"
                      block
                    >
                      Войти
                    </Button>
                  </CardBlock>
                </Card>
              </If>
              <If condition={type !== 'signup'}>
                <Card>
                  <CardBlock className="text-xs-center" style={{ textAlign: 'center' }}>
                    <CardText>Вы еше не зарегистрированы?</CardText>
                    <Button
                      componentClass={Link}
                      href="/auth/signup"
                      block
                    >
                      Создать аккаунт
                    </Button>
                  </CardBlock>
                </Card>
              </If>
            </Col>
          </Row>
        </Grid>
      </Slide>
    );
  }
}
