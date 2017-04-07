import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { autobind } from 'core-decorators';
import css from 'importcss';
import _ from 'lodash';
import {
  Card,
  CardHeader,
  CardBlock,
  CardFooter,
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
      // console.log('message@@!!');
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

  renderMessages() {
    const { messages } = this.state;
    if (!messages) return <Loading text="Загрузка сообщений.." />;
    return (
      <div>
        {messages.map((message) => {
          return (
            <div key={message._id} styleName="container">
              <img src={_.get(message, 'user.profile.avatar')} />
              <div styleName="info">
                <div styleName="author">
                  {message.user.name}
                </div>
                {message.content}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  renderFooter() {
    const { text } = this.state;
    const { user } = this.props;
    if (!user) return null;
    // if (!text) return null;
    return (
      <div styleName="container">
        <img src={user.avatar} />
        <div styleName="info">
          <FormControl
            value={text}
            onKeyPress={this.handleOnKeyPress}
            onChange={this.handleOnChange}
            placeholder="Введите текст комментария"
          />
        </div>
      </div>
    );
  }
  render() {
    const { wrap, title } = this.props;
    if (wrap || title) {
      return (
        <Card style={{ margin: '10px 0' }}>
          <If condition={title}>
            <CardHeader>
              {title}
            </CardHeader>
          </If>
          <CardBlock>
            {this.renderMessages()}
          </CardBlock>
          <CardFooter>
            {this.renderFooter()}
          </CardFooter>
        </Card>
      );
    }
    return (<div>
      {this.renderMessages()}
      {this.renderFooter()}
    </div>);
    // return (
    //   <div>
    //     <Card>
    //       <CardBlock>
    //         {messages.map((message) => {
    //           return (
    //             <div key={message._id} styleName="container">
    //               <img src={_.get(message, 'user.profile.avatar')} />
    //               <div styleName="info">
    //                 <div styleName="author">
    //                   {message.name}
    //                 </div>
    //                 {message.content}
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </CardBlock>
    //     </Card>
    //     <Card>
    //       <CardBlock>
    //         <FormControl
    //           value={text}
    //           onKeyPress={this.handleOnKeyPress}
    //           onChange={this.handleOnChange}
    //           placeholder="Введите текст комментария"
    //         />
    //       </CardBlock>
    //     </Card>
    //   </div>
    // );
  }
}
