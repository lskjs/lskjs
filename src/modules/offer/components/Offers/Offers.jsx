import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import css from 'importcss';
import {
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Link from 'lsk-general/General/Link';
import OfferCard from '../OfferCard';

@observer
@css(require('./Offers.css'))
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
          <div styleName="masonry">
            {offers.list.map(offer => (
              <div key={offer._id} styleName="item">
                <OfferCard linked offer={offer} />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    );
  }
}
