import React, { Component } from 'react';
import { Row, Col, Card, CardBlock } from 'react-bootstrap';

export default class OutRequests extends Component {
  render() {
    return (
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ marginTop: 20 }}>
            <CardBlock>
              Здесь будут исходящие заявки друзей
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}
