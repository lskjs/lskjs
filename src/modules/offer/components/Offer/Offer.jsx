import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import { inject, observer, Provider } from 'mobx-react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import Sad from 'react-icons2/mdi/emoticon-sad';
import Cool from 'react-icons2/mdi/emoticon-cool';

import OfferCard from '../OfferCard';
import Deal from '../Deal';
import NewDeal from '../NewDeal';

@inject('user')
@observer
@css(require('./Offer.css'))
export default class Offer extends Component {
  static propTypes = {
    offer: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }
  constructor() {
    super();
    this.state = {
      createModal: false,
    };
  }
  showCreateDeal = () => {
    this.setState({ createModal: true });
  }
  hideCreateDeal = () => {
    this.setState({ createModal: false });
  }
  render() {
    const { createModal } = this.state;
    const { offer, user } = this.props;
    return (
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col xs={12} md={7}>
          <OfferCard
            offer={offer}
            showCreateDeal={this.showCreateDeal}
            hideCreateDeal={this.hideCreateDeal}
            createModal={createModal}
          />
          <If condition={user._id === offer.user._id && offer.status !== 'finished'}>
            {offer.deals.length > 0
              ? (
                <div>
                  <h3 styleName="heading">Отклики <small>Люди заинтересовавшиеся предложением</small></h3>
                  {offer.deals.map(deal => (
                    <Provider key={deal._id} deal={deal} offer={offer}>
                      <Deal />
                    </Provider>
                  ))}
                </div>
              )
              : (
                <p styleName="not-deals">
                  <Sad />
                  <span>Пока никто не откликнулся на ваше предложение</span>
                </p>
              )
            }
          </If>
          <If condition={user._id !== offer.user._id && offer.status !== 'finished'}>
            {offer.deals.map((deal) => {
              if (user._id === deal.user._id) {
                return (
                  <Provider key={deal._id} deal={deal} offer={offer}>
                    <Deal />
                  </Provider>
                );
              }
              return false;
            })}
          </If>
          <If condition={offer.status === 'finished'}>
            <p styleName="not-deals">
              <Cool />
              <span>Предложение успешно завершилось!</span>
            </p>
          </If>
          <NewDeal
            showModal={createModal}
            hideModal={this.hideCreateDeal}
            offer={offer}
          />
        </Col>
      </Row>
    );
  }
}
