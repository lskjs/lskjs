import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import css from 'importcss';
import cx from 'classnames';
import {
  Card,
  CardBlock,
  CardFooter,
  Label,
  ButtonGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import CheckBook from 'react-icons2/mdi/bookmark-check';
import RemoveBook from 'react-icons2/mdi/bookmark-remove';
import Check from 'react-icons2/mdi/check';
import Close from 'react-icons2/mdi/close';
import FileCheck from 'react-icons2/mdi/file-check';
import KeyValue from '../KeyValue';
import { formatter } from '~/utils';

@inject(stores => ({
  myUser: stores.user,
  deal: stores.deal,
  offer: stores.offer,
  Messages: stores.uapp.modules.chat.components.Messages,
}))
@observer
@css(require('./Deal.css'))
export default class Deal extends Component {
  static propTypes = {
    myUser: PropTypes.object.isRequired,
    deal: PropTypes.object.isRequired,
    offer: PropTypes.object.isRequired,
    Messages: PropTypes.any.isRequired,
  };
  @autobind
  async acceptDeal() {
    const { deal, offer } = this.props;
    await deal.changeStatus('accept');
    offer.status = 'inProgress';
    offer.dealId = deal._id;
  }
  @autobind
  async rejectDeal() {
    const { deal, offer } = this.props;
    await deal.changeStatus('reject');
    offer.status = 'notStarted';
    offer.dealId = null;
  }

  changeOfferStatus = status => async () => {
    const { offer } = this.props;
    await offer.changeStatus(status);
    // this.props.offer.status = status;
  }
  convertPartnerType(type) {
    switch (type) {
      case 1: return {
        name: 'Официальный партнёр',
        style: 'primary',
      };
      case 2: return {
        name: 'Специальный партнёр',
        style: 'warning',
      };
      case 3: return {
        name: 'Эксклюзивный партнёр',
        style: 'info',
      };
      default: return '';
    }
  }
  renderBadges() {
    const { deal } = this.props;
    switch (deal.status) {
      case 'accepted':
        return <Label bsStyle="success"><CheckBook />Исполнитель</Label>;
      case 'rejected':
        return <Label bsStyle="danger"><RemoveBook />Отклонён</Label>;
      default:
        return <Label bsStyle="default">На рассмотрении</Label>;
    }
  }
  renderButtons() {
    const { deal, myUser, offer } = this.props;
    const acceptTooltip = <Tooltip id="acceptTooltip">Назначить исполнителем</Tooltip>;
    const rejectTooltip = <Tooltip id="rejectTooltip">Отказаться от отклика</Tooltip>;
    return (
      <div styleName="buttons">
        <If condition={myUser._id === offer.user._id}>
          <If condition={offer.status !== 'finished'}>
            <ButtonGroup styleName="user-btn user-btn-group">
              <OverlayTrigger placement="top" overlay={acceptTooltip}>
                <Button
                  onClick={this.acceptDeal}
                  bsStyle="success"
                  bsSize="sm"
                  disabled={deal.status === 'accepted'}
                >
                  <Check />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={rejectTooltip}>
                <Button
                  onClick={this.rejectDeal}
                  bsStyle="danger"
                  bsSize="sm"
                  disabled={deal.status === 'rejected'}
                >
                  <Close />
                </Button>
              </OverlayTrigger>
            </ButtonGroup>
          </If>
          <If condition={offer.status === 'review' && deal.status === 'accepted'}>
            <Button
              styleName="user-btn"
              onClick={this.changeOfferStatus('finished')}
              bsStyle="success"
              bsSize="sm"
            >
              Выполнено
            </Button>
            <Button
              styleName="user-btn"
              onClick={this.changeOfferStatus('inProgress')}
              bsStyle="danger"
              bsSize="sm"
            >
              Не выполнено
            </Button>
          </If>
        </If>
        <If condition={myUser._id !== offer.user._id && deal.status !== 'rejected' && offer.status !== 'finished'}>
          <Button styleName="user-btn" onClick={this.rejectDeal} bsStyle="danger" bsSize="sm"><Close /> Отказаться</Button>
        </If>
        <If condition={myUser._id !== offer.user._id && deal.status === 'accepted' && offer.status === 'inProgress'}>
          <Button styleName="user-btn" bsStyle="default" bsSize="sm" onClick={this.changeOfferStatus('review')}>
            <FileCheck /> Завершить
          </Button>
        </If>
      </div>
    );
  }
  render() {
    const { deal, Messages } = this.props;
    return (
      <Card
        styleName={cx({
          deal: true,
          accepted: deal.status === 'accepted',
          rejected: deal.status === 'rejected',
        })}
      >
        <CardBlock styleName="inner-card">
          <section styleName="header">
            <img src={deal.user.avatar} alt={deal.user.fullname} title={deal.user.fullname} />
            <div styleName="info">
              <h4>{deal.user.fullname}</h4>
              <div styleName="system">
                {this.renderBadges()}
                {/*<If condition={partnerType}>*/}
                {/*<Label bsStyle={this.convertPartnerType(partnerType).style}>*/}
                {/*{this.convertPartnerType(partnerType).name}*/}
                {/*</Label>*/}
                {/*</If>*/}
              </div>
              <div styleName="line">
                {/*<KeyValue name="Аудитория" value={formatter(subscribers)} />*/}
                <KeyValue name="Аудитория" value={formatter(1556330)} />
                <KeyValue name="Возраст" value={21} />
              </div>
            </div>
            {this.renderButtons()}
          </section>
          <section styleName="body">
            <p>{deal.info.content}</p>
          </section>
        </CardBlock>
        <If condition={deal.status !== 'rejected'}>
          <CardFooter styleName="footer">
            <Messages subjectType="Deal" subjectId={deal._id} />
          </CardFooter>
        </If>
      </Card>
    );
  }
}
