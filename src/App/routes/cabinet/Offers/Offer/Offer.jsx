import React, { Component } from 'react';
import css from 'importcss';
import {
  Row,
  Col,
} from 'react-bootstrap';
import OfferCard from '../OfferCard';
import Messages from '~/App/modules/chat/Messages';

@css(require('./Offer.css'))
export default class Offer extends Component {
  render() {
    return (
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col xs={12} md={6}>
          <OfferCard
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
          <h3 styleName="heading">Отклики <small>Люди заинтересовавшиеся предложением</small></h3>
          {/*<Messages subjectType="Offer" subjectId="test" />*/}
        </Col>
      </Row>
    );
  }
}
