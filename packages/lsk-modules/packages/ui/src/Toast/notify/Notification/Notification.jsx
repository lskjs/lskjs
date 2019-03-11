import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import If from 'react-if';
import ErrorIcon from '../error';
import WarningIcon from '../warning';
import InfoIcon from '../info';
import SuccessIcon from '../success';
import NotifyItem from '../NotifyItem';

const systemUser = {
  _id: 'bg',
  name: 'BuzzGuru',
  title: 'BuzzGuru',
  // avatar: require('./bgAva.png'),
};

@inject('t')
@observer
class Notification extends Component {
  getHref() {
    const { item = {} } = this.props;
    const { type } = item;
    // console.log('onClick', type);

    const superType = (type && type.substr(0, type.indexOf('.'))) || '';
    // console.log('onClick', {superType});
    if (superType === 'billing') {
      return `/cabinet/billing/${get(item, 'info.transactionId', '')}`;
    }
    if (superType === 'offer') {
      return `/cabinet/offers/${get(item, 'info.offerId', '')}`;
    }
    if (superType === 'deal') {
      return `/cabinet/deals/${get(item, 'info.dealId', '')}`;
    }
    return null;
  }

  getOpponent() {
    const { item } = this.props;
    return get(item, 'info.opponent', systemUser);
  }

  renderInner() {
    const { item = {}, t } = this.props;
    const { type, info } = item;
    console.log(info);
    const superType = (type && type.substr(0, type.indexOf('.'))) || '';
    const opponent = this.getOpponent();


    // console.log('item', item);

    const data = {
      // type, -> f('offer.moderation')
      image: '', // f('offer.moderation') -> info
      title: '', // user.title, offer.title // t('notification.' + type +'.title', item)
      text: '', // t('notification.' + tyoe + '.text', item)
    };

    data.title = opponent.title || opponent.name;

    if ([
      'offer.moderation',
      'deal.inviteRejected',
      'deal.moderation',
      'deal.moderationApproved',
      'deal.moderationRejected',
      'deal.invite',
      'deal.inviteApproved',
      'deal.inviteRejected',
      'deal.proposal',
      'deal.reject',
      'deal.cancel',
      'deal.accept',
      'deal.agreement',
      'deal.transaction',
      'deal.content',
      'deal.contentRejected',
      'deal.contentApproved',
      'deal.publish',
      'deal.complete',
      'deal.review',
      'deal.message',
    ].includes(type)) {
      if (info) {
        const { offer } = info;
        if (offer) data.image = offer.image;
      }
    }

    if ([
      'offer.moderationApproved',
      'offer.moderationRejected',
      'deal.inviteRejected',
      'deal.moderation',
      'deal.moderationApproved',
      'deal.moderationRejected',
      'deal.invite',
      'deal.inviteApproved',
      'deal.inviteRejected',
      'deal.proposal',
      'deal.reject',
      'deal.cancel',
      'deal.accept',
      'deal.agreement',
      'deal.transaction',
      'deal.content',
      'deal.contentRejected',
      'deal.contentApproved',
      'deal.publish',
      'deal.complete',
      'deal.review',
      'deal.message',
    ].includes(type)) {
      if (info) {
        if (opponent) data.title = opponent.title || opponent.name;
      }
    }

    if (!data.image) data.image = systemUser.avatar;

    // if ([
    //   'deal.agreementApproved',
    //   'deal.contentApproved',
    //   'billing.inSuccess',
    //   'billing.outSuccess',
    //   'user.approveEmail',
    //   'user.recovery',
    //   'user.billingApproved',
    // ]) {
    //   data.text = t('notification.' + type , item);
    //   // data.text = t('notification.' + type + '.text', item);
    // }
    data.text = t(`notification.${type}`, {
      ...item,
      ...(item.info || {}),
    });

    if (superType === 'notify') {
      const { title, text } = info;
      data.title = title;
      data.text = text;
      if (type === 'notify.error') {
        data.image = <ErrorIcon size={20} />;
      }
      if (type === 'notify.success') {
        data.image = <SuccessIcon size={20} />;
      }
      if (type === 'notify.warning') {
        data.image = <WarningIcon size={20} />;
      }
      if (type === 'notify.info') {
        data.image = <InfoIcon size={20} />;
      }
    }
    // if (typeof data.image !== 'string') data.image = '';
    if (typeof data.title !== 'string') data.title = '';
    if (typeof data.text !== 'string') data.text = '';

    return (
      <div className="notify-item">
        <If condition={data.image}>
          <div className="notify-avatar">
            {data.image}
          </div>
        </If>
        <div className="notify-info">
          <div className="notify-content">
            <span className="notify-info-entity">
              <If condition={data.title}>
                <span className="notify-title">
                  {data.title}
                </span>
              </If>
              <If condition={data.text}>
                <div className="notify-text">
                  {data.text}
                </div>
              </If>
            </span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { standalone, item = {}, transparent } = this.props;
    const href = standalone ? null : this.getHref();
    return (
      <div aria-hidden onClick={() => item.view && item.view()}>
        <NotifyItem
          standalone={standalone}
          unread={transparent ? false : !(item.viewedAt)}
          href={href}
          itemType={item.type}
        >
          {this.renderInner()}
        </NotifyItem>
      </div>
    );
  }
}

export default Notification;
