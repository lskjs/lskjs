import React, { PureComponent } from 'react';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import T from '../../../T';
import {
  FormContainer,
  WelcomeHeader,
  FormWrap,
  RememberCheckbox,
  Row,
  Col,
  FormWrapper,
  ImageContainer,
  AdditionalInfo,
} from './LoginScreen.styles';

const FormItem = Form.Item;

class LoginScreen extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
  }
  render() {
    return (
      <Row>
        <Col lg={6}>
          <ImageContainer image="https://picsum.photos/800?random" />
        </Col>
        <Col lg={6}>
          <FormWrapper>
            <FormContainer>
              <h2><T name="lskLogin.header" /></h2>
              <WelcomeHeader><T name="lskLogin.welcomeHeader" /></WelcomeHeader>
              <FormWrap onSubmit={this.handleSubmit}>
                <FormItem>
                  <Input
                    size="large"
                    prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                    placeholder={<T name="lskLogin.userNamePlaceholder" />}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    size="large"
                    prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                    type="password"
                    placeholder={<T name="lskLogin.passwordPlaceholder" />}
                  />
                </FormItem>
                <RememberCheckbox>
                  <Checkbox><T name="lskLogin.checkbox" /></Checkbox>
                </RememberCheckbox>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="btn-cta btn-block">
                    <T name="lskLogin.loginButton" />
                  </Button>
                </FormItem>
              </FormWrap>
              <AdditionalInfo><T name="lskLogin.signupText" /><a href="123"><T name="lskLogin.signup" /></a></AdditionalInfo>
              <AdditionalInfo>
                <T name="lskLogin.resetPasswordText" />
                <a href="123">
                  <T name="lskLogin.resetPassword" />
                </a>
              </AdditionalInfo>
            </FormContainer>
          </FormWrapper>
        </Col>
      </Row>
    );
  }
}

export default LoginScreen;
