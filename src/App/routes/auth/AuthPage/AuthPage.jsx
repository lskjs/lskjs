import React from 'react';
import importcss from 'importcss';
import { autobind } from 'core-decorators';
import { inject } from 'mobx-react';
import sample from 'lodash/sample';
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
} from 'react-bootstrap';
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

@inject('app')
@importcss(require('./AuthPage.css'))
export default class AuthPage extends Component {

  @autobind
  async handleSubmit(data) {
    const auth = this.props.app.auth;
    // try {
    if (this.props.type === 'login') {
      const res = await auth.login(data);
      this.redirect('/');
    }
    if (this.props.type === 'signup') {
      const res = await auth.signup(data);
      this.redirect('/');
    }
    if (this.props.type === 'recovery') {
      const res = await auth.recovery(data);
      global.toast({
        type: 'success',
        title: 'Письмо с восстановлением пароля отправлено на почту.',
      });
    }
    // }
    // console.log('handleSubmit', data);
    // global.toast('asdasda');
  }

  render() {
    let { type } = this.props;
    if (!type) type = 'login';
    const status = null;
    let fields = [
      {
        name: 'login',
        title: 'Email',
        control: {
          placeholder: 'Например, utkin@mail.ru',
        },
      },
      {
        name: 'password',
        title: 'Пароль',
        control: {
          type: 'password',
        },
      },
      {
        name: 'name',
        title: 'Имя',
        control: {
          placeholder: 'Например, Василий',
        },
      },
    ];
    if (type === 'login') {
      fields = fields.slice(0, 2);
      fields[1].help = (
        <div style={{ textAlign: 'right' }}>
          <A href="/auth/recovery">
            Забыли пароль?
          </A>
        </div>
      );
    }
    if (type === 'recovery') {
      fields = fields.slice(0, 1);
    }

    return (
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
                        {/* <If condition={!status}> */}
                        <span style={{ visibility: !status ? 'visible' : 'hidden' }}>
                          <If condition={type === 'login'}>
                            Войти
                          </If>
                          <If condition={type === 'signup'}>
                            Создать аккаунт
                          </If>
                          <If condition={type === 'recovery'}>
                            Сбросить пароль
                          </If>
                        </span>
                        {/* <div styleName="button-icon-status spin"><Loading /></div> */}
                        <If condition={status}>
                          <div styleName="button-icon-status">
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

                {/* <CardFooter className="text-xs-center">
                  <ButtonGroup>
                    <Button styleName='btn-social is-vkontakte'><VKontakte /></Button>
                    <Button styleName='btn-social is-odnoklassniki'><Odnoklassniki /></Button>
                    <Button styleName='btn-social is-facebook'><Facebook /></Button>
                    <Button styleName='btn-social is-twitter'><Twitter /></Button>
                    <Button styleName='btn-social is-twitch'><Twitch /></Button>
                    <Button styleName='btn-social is-tumblr'><Tumblr /></Button>
                    <Button styleName='btn-social is-instagram'><Instagram /></Button>
                  </ButtonGroup>
                </CardFooter> */}
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
