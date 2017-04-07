import React, { Component } from 'react';
import css from 'importcss';
import {
  Row,
  Col,
} from 'react-bootstrap';
import OfferCard from '../OfferCard';
import Deal from './components/Deal';

@css(require('./Offer.css'))
export default class Offer extends Component {
  render() {
    return (
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col xs={12} md={7}>
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
          <Deal
            _id={1}
            user={{
              fullName: 'Василий Гребенщеков Михайлович',
              avatar: 'http://localhost:3000/assets/no-avatar.png',
              meta: {
                partnerType: 2,
                subscribers: 150322,
              },
            }}
            text="Это текст-'рыба', часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной 'рыбой' для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов."
            status="notStarted"
          />
        </Col>
      </Row>
    );
  }
}
