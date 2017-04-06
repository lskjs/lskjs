import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import {
  Card,
  CardBlock,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Link from 'lsk-general/General/Link';

@observer
export default class Offers extends Component {
  static propTypes = {
    offers: PropTypes.object.isRequired,
  }
  render() {
    const { offers } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <Button componentClass={Link} href="/cabinet/offers/add">Создать новое предложение</Button>
        </Col>
        {offers.list.map((offer) => {
          console.log(offer);
          return (
            <Col key={offer._id} xs={12} md={6}>
              <Card>
                <CardBlock>
                  {offer._id}
                </CardBlock>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
}
