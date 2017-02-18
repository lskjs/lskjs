import React, { Component } from 'react';
import importcss from 'importcss';
import { autobind } from 'core-decorators';
import sample from 'lodash/sample';
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
  Button,
  Form,
  FormGroup,
  ButtonGroup,
  FormFeedback,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
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
import Slide from 'lsk-general/General/Slide';
import Link from 'lsk-general/General/Link';

@importcss(require('./AuthForm.css'))
export default class AuthForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      validEmail: 'none',
      password: '',
      validPassword: 'none',
      status: 'none',
    };
  }

  @autobind
  handleChangeField(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value,
        [`valid${field.capitalize()}`]: this.validate(field),
      });
    };
  }

  @autobind
  validate(type) {
    const rgxEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const e = this.state[type];
    if (e.length === 0) {
      return 'none';
    } else if (type === 'email' ? rgxEmail.test(e) : e.length > 6) {
      return 'success';
    }
    return 'danger';
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    this.setState({ status: 'wait' });
    setTimeout(() => {
      this.setState({ status: sample(['ok', 'error']) });
    }, 2000);
    setTimeout(() => {
      this.setState({ status: 'none' });
    }, 3500);
  }
  render() {
    const { email, password, status } = this.state;
    return (
      <Slide full video="http://skill-branch.ru/video-background.webm">
        <Container>
          <Row>
            <Col md="5" style={{ margin: 'auto' }}>
              <Card>
                <CardBlock>
                  <CardTitle>Вход</CardTitle>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup color={this.validate('email')}>
                      <Label for="emailInput">Электронная почта</Label>
                      <InputGroup>
                        <InputGroupAddon><Email /></InputGroupAddon>
                        <Input
                          id="emailInput"
                          type="email"
                          placeholder="Электронная почта"
                          state={this.validate('email')}
                          onChange={this.handleChangeField('email')}
                          value={email || ''}
                        />
                      </InputGroup>
                      <If condition={this.validate('email') === 'danger'}>
                        <FormFeedback>Введён не корректный адрес почты</FormFeedback>
                      </If>
                    </FormGroup>
                    <FormGroup color={this.validate('password')}>
                      <Label for="passwordInput">Пароль</Label>
                      <InputGroup>
                        <InputGroupAddon><Lock /></InputGroupAddon>
                        <Input
                          id="passwordInput"
                          type="password"
                          placeholder="Пароль"
                          state={this.validate('password')}
                          onChange={this.handleChangeField('password')}
                          value={password || ''}
                        />
                      </InputGroup>
                      <If condition={this.validate('password') === 'danger'}>
                        <FormFeedback>Пароль должен быть больше 6 символов</FormFeedback>
                      </If>
                      <Button
                        styleName="recovery-password"
                        color="link"
                        href="/auth/recovery"
                        tag={Link}
                      >
                        Забыли пароль?
                      </Button>
                    </FormGroup>
                    <Button
                      size="lg"
                      color="primary"
                      disabled={
                        status !== 'none'
                        || this.validate('email') === 'none'
                        || this.validate('password') === 'none'
                      }
                    >
                      <If condition={status === 'none'}>
                        Войти
                      </If>
                      <If condition={status === 'wait'}>
                        <div styleName="button-icon-status spin"><Loading /></div>
                      </If>
                      <If condition={status === 'ok'}>
                        <div styleName="button-icon-status"><Check /></div>
                      </If>
                      <If condition={status === 'error'}>
                        <div styleName="button-icon-status"><Error /></div>
                      </If>
                    </Button>
                  </Form>
                </CardBlock>
                <CardFooter className="text-xs-center">
                  <ButtonGroup>
                    <Button styleName="btn-social is-vkontakte"><VKontakte /></Button>
                    <Button styleName="btn-social is-odnoklassniki"><Odnoklassniki /></Button>
                    <Button styleName="btn-social is-facebook"><Facebook /></Button>
                    <Button styleName="btn-social is-twitter"><Twitter /></Button>
                    <Button styleName="btn-social is-twitch"><Twitch /></Button>
                    <Button styleName="btn-social is-tumblr"><Tumblr /></Button>
                    <Button styleName="btn-social is-instagram"><Instagram /></Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
              <Card>
                <CardBlock className="text-xs-center" style={{ textAlign: 'center' }}>
                  <CardText>Вы еше не зарегистрированы?</CardText>
                  <Button
                    color="success"
                    href="/signup"
                    tag={Link}
                    outline
                    block
                  >
                    Создать аккаунт
                  </Button>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </Container>
      </Slide>
    );
  }
}
