import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  CardBlock,
  Row,
  Col,
} from 'react-bootstrap';

@observer
export default class Offers extends Component {
  static propTypes = {
    offers: PropTypes.object.isRequired,
  }
  render() {
    const { offers } = this.props;
    return (
      <Row>
        {offers.list.map(offer => (
          <Col key={offer._id} md={6}>
            <Card>
              <CardBlock>
                {offer._id}
              </CardBlock>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}
