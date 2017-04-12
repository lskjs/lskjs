import React, { Component } from 'react';
import {
  Card,
  CardBlock,
} from 'react-bootstrap';
import { inject } from 'mobx-react';

// @inject(s => ({Messages: }))

@inject('uapp')
export default class CommentsPage extends Component {
  render() {
    const Messages = this.props.uapp.modules.chat.components.Messages;
    return (
      <Card>
        <CardBlock>
          Здесь будет ПОСТ, и коментарии под ним
          <Messages subjectType="Chat" subjectId="test" />
        </CardBlock>
      </Card>
    );
  }
}
