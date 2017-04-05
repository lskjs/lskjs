import React, { Component } from 'react';
import {
  Card,
  CardBlock,
} from 'react-bootstrap';
import Messages from '~/App/modules/chat/Messages';

export default class CommentsPage extends Component {
  render() {
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
