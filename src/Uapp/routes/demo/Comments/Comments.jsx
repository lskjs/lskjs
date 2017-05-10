import React, { Component } from 'react';
import {
  Card,
  CardBlock,
  CardTitle,
} from 'react-bootstrap';
import { inject } from 'mobx-react';

// @inject(s => ({Messages: }))

@inject('uapp')
export default class CommentsPage extends Component {
  render() {
    const Messages = this.props.uapp.modules.chat.components.Messages;
    return (
      <Card>
        <CardTitle>
          Пример публичных комментариев
        </CardTitle>
        <CardBlock>
          <Messages subjectType="Chat" subjectId="test" />
        </CardBlock>
      </Card>
    );
  }
}
