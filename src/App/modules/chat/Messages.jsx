import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { autobind } from 'core-decorators';
import _ from 'lodash';
import {
  Card,
  CardBlock,
  FormControl,
} from 'react-bootstrap';

@inject('user', 'api')
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
          Loading
        </If>
        <If condition={this.state.messages}>
          {this.state.messages.map(message => (
            <Card key={message._id}>
              <CardBlock>
                <img
                  style={{
                    width: '20px',
                    borderRadius: '50%',
                    margin: '10px',
                  }}
                  src={_.get(message, 'user.profile.avatar')}
                />
                {message.content}
              </CardBlock>
            </Card>
          ))}
          <Card>
            <CardBlock>
              <FormControl
                value={this.state.text}
                onKeyPress={this.handleOnKeyPress}
                onChange={this.handleOnChange}
              />
            </CardBlock>
          </Card>
        </If>
      </div>
    );
  }
}
