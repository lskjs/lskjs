import React, { Component } from 'react';
import {
  Card,
  CardBlock,
} from 'react-bootstrap';
import Comments from '~/App/modules/chat';


export default class CommentsPage extends Component {
  render() {
    return (
      <Card>
        <CardBlock>
          Здесь будет чат
          <Comments subjectType="Chat" subjectId="test" />
        </CardBlock>
      </Card>
    );
  }
}
