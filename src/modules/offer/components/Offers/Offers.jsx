import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Link from 'lsk-general/General/Link';
import _ from 'lodash';
import OfferCard from '../OfferCard';

@observer
export default class Offers extends Component {
  static propTypes = {
    offers: PropTypes.object.isRequired,
  }
  render() {
    const { offers = [] } = this.props;
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
        {offers.map((offer) => {
          // console.log(offer);
          return (
            <Col xs={12} md={6}>
              <OfferCard
                _id={offer._id}
                title={offer.title}
                user={{
                  fullName: _.get(offer, 'user.fullname', ''),
                  avatar: _.get(offer, 'user.profile.avatar', ''),
                }}
                type={offer.type}
                price={offer.price}
                info={offer.info}
                createdAt={offer.createdAt}
              />
            </Col>
          );
        })}
      </Row>
    );
  }
}
