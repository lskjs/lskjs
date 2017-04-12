import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Link from 'lsk-general/General/Link';

import OfferCard from './OfferCard';

@observer
export default class Offers extends Component {
  static propTypes = {
    offers: PropTypes.object.isRequired,
  }
  render() {
    const { offers } = this.props;
    return (
      <Row>
        <Col xs={12} style={{ marginBottom: 15 }}>
          <Button
            componentClass={Link}
            bsSize="sm"
            href="/cabinet/offers/add"
          >
            Создать новое предложение
          </Button>
        </Col>
        {/*{offers.list.map((offer) => {*/}
          {/*console.log(offer);*/}
          {/*return (*/}
            <Col xs={12} md={6}>
              <OfferCard
                linked
                _id={1}
                title="Кек"
                user={{
                  fullName: 'Андрей Кондалов',
                  avatar: 'http://localhost:3000/assets/no-avatar.png',
                }}
                type="Преролл"
                price={15000}
                info={{
                  content: 'Какое-то описание',
                }}
                createdAt={1491091200000}
              />
            </Col>
          {/*);*/}
        {/*})}*/}
      </Row>
    );
  }
}
