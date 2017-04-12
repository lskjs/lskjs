import React, { Component } from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import OfferCard from '../OfferCard';
// import Messages from '~/App/modules/chat/Messages';
import _ from 'lodash';

export default class Offer extends Component {
  render() {
    const { offer } = this.props;
    // console.log({ offer });
    return (
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col xs={12} md={6}>
          <OfferCard
            _id={offer._id}
            title={offer.title}
            user={{
              fullName: _.get(offer, 'user.fullname'),
              avatar: _.get(offer, 'user.avatar', 'http://localhost:3000/assets/no-avatar.png'),
            }}
            type={offer.type}
            price={offer.price}
            info={offer.info}
            createdAt={offer.createdAt}
          />
          {/* <Messages subjectType="Offer" subjectId={offer._id} /> */}
        </Col>
      </Row>
    );
  }
}
