import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import { Card, CardBlock } from 'reactstrap';

@inject('user')
@observer
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
