import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { autobind } from 'core-decorators';
import css from 'importcss';
import _ from 'lodash';
import {
  Card,
  CardBlock,
  FormControl,
} from 'react-bootstrap';
import Loading from '~/App/components/Loading';

@inject('user', 'api')
@css(require('./Messages.css'))
export default class Messages extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
    const { subjectType, subjectId } = this.props;
    this.socket = this.props.api.ws('module/chat/comments', {
      query: { subjectType, subjectId },
    });
    this.socket.on('message', async (message) => {
      console.log('message@@!!');
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages });
    });
    const messages = await this.getLastMessages();
    this.setState({ messages });
  }
  componentWillUnmount() {
    this.socket && this.socket.disconnect();
  }

  async getLastMessages() {
    const res = await this.props.api.fetch(`/api/module/message/${this.props.subjectType}/${this.props.subjectId}`);
    return res.data || [];
  }

  @autobind
  handleOnKeyPress(e) {
    const { key } = e;
    if (key !== 'Enter') return false;
    const { text } = this.state;
    if (!text || text.length === 0) return;
      // this.socket.emit('message', { content: text });
    this.props.api.fetch('/api/module/message', {
      method: 'POST',
      body: {
        content: text,
        subjectType: this.props.subjectType,
        subjectId: this.props.subjectId,
      },
    });
    this.setState({ text: '' });
  }

  @autobind
  handleOnChange(e) {
    const { value } = e.target;
    this.setState({ text: value });
  }

  render() {
    return (
      <div>
        <If condition={!this.state.messages}>
          <Loading text="Загрузка сообщений.." />
        </If>
        <If condition={this.state.messages}>
          {this.state.messages.map(message => (
            <div key={message._id} styleName="container">
              <img src={_.get(message, 'user.profile.avatar')} />
              <div styleName="info">
                <div styleName="author">{`${message.user.profile.firstName} ${message.user.profile.lastName}`}</div>
                {message.content}
              </div>
            </div>
          ))}
          <Card>
            <FormControl
              value={this.state.text}
              onKeyPress={this.handleOnKeyPress}
              onChange={this.handleOnChange}
              placeholder="Введите текст комментария"
            />
          </Card>
        </If>
      </div>
    );
  }
}
