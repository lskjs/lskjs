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
} from 'reactstrap';
import {
  Grid,
  Row,
  Col,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { map } from 'lodash';

import Email from 'react-icons/lib/fa/envelope';
import Lock from 'react-icons/lib/fa/lock';

import VKontakte from 'react-icons/lib/fa/vk';
import Odnoklassniki from 'react-icons/lib/fa/odnoklassniki';
import Facebook from 'react-icons/lib/fa/facebook';
import Twitter from 'react-icons/lib/fa/twitter';
import Twitch from 'react-icons/lib/fa/twitch';
import Tumblr from 'react-icons/lib/fa/tumblr';
import Instagram from 'react-icons/lib/fa/instagram';

import Loading from 'react-icons/lib/md/refresh';
import Error from 'react-icons/lib/md/clear';
import Check from 'react-icons/lib/md/check';

import Component from 'lsk-general/General/Component';
import Slide from 'lsk-general/General/Slide';
import Link from 'lsk-general/General/Link';
import A from 'lsk-general/General/A';
import Form from 'lsk-general/General/Form';

import Header from '../../../components/Header';

const infoFields = [
  {
    name: 'firstName',
    title: 'Имя',
    control: {
      placeholder: 'Например, Василий',
    },
  },
  {
    name: 'lastName',
    title: 'Фамилия',
    control: {
      placeholder: 'Например, Пушкин',
    },
  },
  {
    name: 'middleName',
    title: 'Отчество',
    control: {
      placeholder: 'Например, Александрович',
    },
  },
];


const passportButtons = {
  vkontakte: {
    icon: <VKontakte />,
    color: '#fff000',
  },
  odnoklassniki: {
    icon: <Odnoklassniki />,
  },
  facebook: {
    icon: <Facebook />,
  },
  twitter: {
    icon: <Twitter />,
  },
  twitch: {
    icon: <Twitch />,
  },
  tumblr: {
    icon: <Tumblr />,
  },
  instagram: {
    icon: <Instagram />,
  },
};


@inject('auth', 'ui') @observer
@importcss(require('./AuthPage.css'))
export default class AuthPage extends Component {

  static defaultProps = {
    type: 'login',
  }

  static propTypes = {
    type: PropTypes.string,
  }

  @autobind
  async handleSubmit(data) {
    const { type, auth, query } = this.props;
    // try {
    if (this.props.type === 'login') {
      await auth.login(data);
      this.redirect('/');
    }
    if (this.props.type === 'signupPassport') {
      await auth.signupPassport(data, query);
      this.redirect('/');
    }
    if (this.props.type === 'signup') {
      await auth.signup(data);
      this.redirect('/');
    }
    if (this.props.type === 'recovery') {
      await auth.recovery(data);
      global.toast({
        type: 'success',
        title: 'Письмо с восстановлением пароля отправлено на почту.',
      });
    }
  }

  getFields(type) {
    const login = {
      name: 'login',
      title: 'Email',
      control: {
        placeholder: 'Например, utkin@mail.ru',
      },
    };
    const password = {
      name: 'password',
      title: 'Пароль',
      control: {
        type: 'password',
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

    if (type === 'signupPassport') {
      return [
        login,
        ...infoFields,
      ].map((field) => {
        return {
          ...field,
          value: this.props.passport.profile[field.name],
        };
      });
    }

    return [
      login,
      password,
      ...infoFields,
    ];
  }

  render() {
    const { type, auth } = this.props;
    const status = this.props.ui.statusRequest;
    const fields = this.getFields(type);
    return (
      <div>
        <Header siteTitle={this.props.siteTitle} />
        <Slide
          full
          video="http://skill-branch.ru/video-background.webm"
          overlay
          // overlay='rgba()'
        >
          <Grid>
            <Row>
              <Col md={4} mdOffset={4}>
                <Card>
                  <CardBlock>
                    <CardTitle>
                      <If condition={type === 'login'}>
                        Вход
                      </If>
                      <If condition={type === 'signup'}>
                        Регистрация
                      </If>
                      <If condition={type === 'recovery'}>
                        Восстановить пароль
                      </If>
                    </CardTitle>
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
                        name: {
                          presence: {
                            message: 'Поле не должно быть пустым',
                          },
                        },
                        surname: {
                          presence: {
                            message: 'Поле не должно быть пустым',
                          },
                        },
                        middlename: {
                          presence: {
                            message: 'Поле не должно быть пустым',
                          },
                        },
                      }}
                      onSubmit={this.handleSubmit}
                      // onError={this.handleSubmit}
                      submitButton={(
                        <Button
                          type="submit"
                          bsStyle="primary"
                          disabled={!!status}
                          style={{
                            position: 'relative',
                          }}
                        >
                          <span style={{ display: !status ? 'block' : 'none' }}>
                            <If condition={type === 'login'}>
                              Войти
                            </If>
                            <If condition={type === 'signup'}>
                              Создать аккаунт
                            </If>
                            <If condition={type === 'signupPassport'}>
                              Создать аккаунт
                            </If>
                            <If condition={type === 'recovery'}>
                              Сбросить пароль
                            </If>
                          </span>
                          <If condition={status}>
                            <div
                              className={cx({
                                'button-icon-status': true,
                                spin: status === 'wait',
                              })}
                            >
                              <If condition={status === 'wait'}>
                                <Loading />
                              </If>
                              <If condition={status === 'ok'}>
                                <Check />
                              </If>
                              <If condition={status === 'error'}>
                                <Error />
                              </If>
                            </div>
                          </If>
                        </Button>
                      )}
                    />
                  </CardBlock>
                  <CardFooter className="text-xs-center">
                    <ButtonGroup>
                      {map(passportButtons, (value, name) => (
                        <Button
                          key={name}
                          styleName={`btn-social is-${name}`}
                          onClick={() => auth.authPassport(name)}
                        >
                          {value.icon}
                        </Button>
                      ))}
                    </ButtonGroup>
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
      </div>
    );
  }
}
