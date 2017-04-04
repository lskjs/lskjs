import React, { Component } from 'react';
import io from 'socket.io-client';
import { inject } from 'mobx-react';
import _ from 'lodash';
import {
  Card,
  CardBlock,
  FormControl,
} from 'react-bootstrap';
import Api from '~/App/api';
function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
@inject('user')
// @inject('api')
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      messages: [],
    };
    this.api = new Api({
      base: '/api/module/message',
    });
    this.api.setAuthToken(getCookie('token'));
    // console.log('comments inited', props, this.api);
    const token = _.get(props, 'user.store.auth.token');
    const { subjectType, subjectId } = props;
    let url;
    if (__DEV__) url = 'localhost:8080/api/module/chat/comments';
    else url = '/api/module/chat/comments';
    this.api.fetch('/Chat/7ty475ty5');
    // this.socket = api.io.connect('/api/module/chat/comments', {
    //   query: { subjectType, subjectId, token },
    // })
    // this.socket2 = api.io.connect('/api/module/chat/comments', {
    //   query: { subjectType, subjectId, token },
    // })
    this.socket = io(url, {
      transports: ['websocket'],
      query: { subjectType, subjectId, token },
    });

    // this.socket = api.io.namespace('/api/module/chat/comments')

    // console.log(this.socket);
    this.socket.on('message', async (message) => {
      const { messages } = this.state;
      messages.push(message);
      this.setState({ messages });
    });
  }
  async componentDidMount() {
    const res = await this.getLastMessages();
    this.setState({ messages: res.data || [] });
  }
  async getLastMessages() {
    return this.api.fetch(`/${this.props.subjectType}/${this.props.subjectId}`);
  }
  handleOnKeyPress() {
    return (e) => {
      const { key } = e;
      const { value } = e.target;
      if (key === 'Enter') {
        const { text } = this.state;
        if (!text || text.length === 0) return;
        // this.socket.emit('message', { content: text });
        this.api.fetch('/', {
          method: 'POST',
          body: {
            content: text,
            subjectType: this.props.subjectType,
            subjectId: this.props.subjectId,
          },
        });
        this.setState({ text: '' });
      }
    };
  }
  handleOnChange() {
    return (e) => {
      const { value } = e.target;
      this.setState({ text: value });
    };
  }
  render() {
    return (<div>
      {this.state.messages.map((message) => {
        return (<Card key={message._id}>
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
        </Card>);
      })}
      <Card>
        <CardBlock>
          <FormControl
            value={this.state.text}
            onKeyPress={this.handleOnKeyPress()}
            onChange={this.handleOnChange()}
          />
        </CardBlock>
      </Card>
    </div>);
  }
}
