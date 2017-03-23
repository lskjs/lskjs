import React, { Component } from 'react';
import { Row, Col, Card, CardBlock } from 'react-bootstrap';

export default class FriendsPage extends Component {
  render() {
    return (
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ marginTop: 20 }}>
            <CardBlock>
              Здесь будут твои пользователя
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}
