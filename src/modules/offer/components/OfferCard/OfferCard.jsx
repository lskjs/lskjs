import React, { Component, PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import css from 'importcss';
import { toJS } from 'mobx';
import moment from 'moment';
import {
  Card,
  CardBlock,
  Label,
  Button,
} from 'react-bootstrap';
import { formatter } from '~/utils';
import Link from 'lsk-general/General/Link';
import find from 'lodash/find';

import Ruble from 'react-icons2/mdi/currency-rub';
import Timer from 'react-icons2/mdi/timer-sand';
import ClockFast from 'react-icons2/mdi/clock-fast';
import Check from 'react-icons2/mdi/bookmark-check';
import Incognito from 'react-icons2/mdi/incognito';

@inject(stores => ({
  myUser: stores.user,
}))
@observer
@css(require('./OfferCard.css'))
export default class OfferCard extends Component {
  static defaultProps = {
    linked: false,
    showCreateDeal: null,
  }
  static propTypes = {
    myUser: PropTypes.object.isRequired,
    offer: PropTypes.object.isRequired,
    showCreateDeal: PropTypes.func,
    linked: PropTypes.bool,
  }
  convertStatusToStep(status) {
    switch (status) {
      case 'notStarted': return 0;
      case 'inProgress': return 1;
      case 'review': return 2;
      case 'finished': return 3;
      default: return 0;
    }
  }
  aclStatusBlock() {
    const { offer, myUser } = this.props;
    const existsDeal = find(toJS(offer.deals), { userId: myUser._id });
    if (existsDeal && existsDeal.status !== 'rejected') {
      return true;
    } else if (offer.user._id === myUser._id && offer.status !== 'notStarted') {
      return true;
    } else if (offer.user._id === myUser._id && offer.dealId) {
      return true;
    }
    return false;
  }
  renderSteps() {
    return [
      {
        icon: <Timer />,
        title: 'Не начато',
        description: 'Сделка находится в ожидании заказчика',
      },
      {
        icon: <ClockFast />,
        title: 'В работе',
        description: 'Отклик находится в процессе выполнения',
      },
      {
        icon: <Incognito />,
        title: 'Завершено',
        description: 'Находится на проверке у заказчика',
      },
      {
        icon: <Check />,
        title: 'Принято',
        description: 'Сделка завершена успешно',
      },
    ].map((s, i) => <Step key={i} {...s} />);
  }
  renderCard() {
    const { offer, myUser, linked, showCreateDeal } = this.props;
    return (
      <Card styleName="card">
        <CardBlock>
          <section styleName="header">
            <img
              src={offer.user.avatar}
              alt={offer.user.fullName}
            />
            <div styleName="info">
              <h5>{offer.user.fullName}</h5>
              <small>{moment(offer.createdAt).locale('ru').fromNow()}</small>
            </div>
          </section>
          <section styleName="body">
            <h4>{offer.title}</h4>
            <p>{offer.info.content}</p>
          </section>
          <section styleName="footer">
            {offer.price && <Label bsStyle="primary">{formatter(offer.price)}<Ruble /></Label>}
            {offer.type && <Label bsStyle="default">{offer.type}</Label>}
          </section>
          <If condition={!linked}>
            {this.aclStatusBlock() && (
              <section styleName="steps">
                <Steps current={this.convertStatusToStep(offer.status)} labelPlacement="vertical">
                  {this.renderSteps()}
                </Steps>
              </section>
            )}
            <If condition={myUser._id !== offer.user._id && !find(toJS(offer.deals), { userId: myUser._id })}>
              <Button
                onClick={showCreateDeal}
                bsStyle="primary"
                styleName="add"
              >
                Откликнуться на предложение
              </Button>
            </If>
          </If>
        </CardBlock>
      </Card>
    );
  }
  render() {
    const { offer, linked } = this.props;
    if (linked) {
      return (
        <Link styleName="link" href={`/cabinet/offers/${offer._id}`}>
          {this.renderCard()}
        </Link>
      );
    }
    return this.renderCard();
  }
}
