import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card, CardBlock } from 'reactstrap';

export default class MessagesPage extends Component {
  render() {
    return (
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ marginTop: 20 }}>
            <CardBlock>
              Здесь будут твои сообщения
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}
