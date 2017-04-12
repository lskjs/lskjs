import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import cx from 'classnames';
import {
  Card,
  CardBlock,
  CardFooter,
  Label,
} from 'react-bootstrap';
import Steps, { Step } from 'rc-steps';
import { inject } from 'mobx-react';

import Timer from 'react-icons2/mdi/timer-sand';
import ClockFast from 'react-icons2/mdi/clock-fast';
import Check from 'react-icons2/mdi/bookmark-check';
import Incognito from 'react-icons2/mdi/incognito';

import KeyValue from './components/KeyValue';
import { formatter } from '~/utils';



@css(require('./Deal.css'))
@inject('uapp')
export default class Deal extends Component {
  convertPartnerType(type) {
    switch (type) {
      case 1: return {
        name: 'Официальный партнёр',
        style: 'primary',
      };
      case 2: return {
        name: 'Эксклюзивный партнёр',
        style: 'info',
      };
      default: return null;
    }
  }
  // не начат, в работе, завершено, принят
  // notStarted, inProgress, finished, accepted
  convertStatusToStep(status) {
    switch (status) {
      case 'notStarted': return 0;
      case 'inProgress': return 1;
      case 'finished': return 2;
      case 'accepted': return 3;
      default: return 0;
    }
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
  render() {
    const Messages = this.props.uapp.modules.chat.components.Messages;
    const {
      _id,
      user: {
        avatar,
        fullName,
        meta: {
          partnerType,
          subscribers,
        },
      },
      text,
      status,
    } = this.props;
    return (
      <Card
        styleName={cx({
          accepted: status !== 'notStarted',
        })}
      >
        <CardBlock>
          <section styleName="header">
            <img src={avatar} alt={fullName} title={fullName} />
            <div styleName="info">
              <h4>{fullName}</h4>
              <If condition={partnerType}>
                <Label bsStyle={this.convertPartnerType(partnerType).style}>
                  {this.convertPartnerType(partnerType).name}
                </Label>
              </If>
              <div styleName="line">
                <KeyValue name="Аудитория" value={formatter(subscribers)} />
              </div>
            </div>
          </section>
          <section styleName="body">
            <p>{text}</p>
          </section>
          <section styleName="steps">
            <Steps current={this.convertStatusToStep(status)} labelPlacement="vertical">
              {this.renderSteps()}
            </Steps>
          </section>
        </CardBlock>
        <CardFooter styleName="footer">
          <Messages subjectType="Deal" subjectId={_id} />
        </CardFooter>
      </Card>
    );
  }
}
