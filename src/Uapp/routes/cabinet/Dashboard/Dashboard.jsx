import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBlock,
} from 'react-bootstrap';
import InfoBox from 'lsk-admin/Admin/lib/widgets/InfoBox';
import Group from 'react-icons2/fa/group';
import Eye from 'react-icons2/fa/eye';
import Clock from 'react-icons2/fa/clock-o';
import Laptop from 'react-icons2/fa/laptop';
import Tablet from 'react-icons2/fa/tablet';
import Mobile from 'react-icons2/fa/mobile';
import Desktop from 'react-icons2/fa/desktop';
import css from 'importcss';
import { formatter } from '~/utils';
import GenderBlock from './components/GenderBlock';

@css(require('./Dashboard.css'))
export default class Dashboard extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <div styleName="flex-row">
            <div styleName="flex-col gr-1">
              <InfoBox
                icon={<Group />}
                text="Подписчики"
                count={formatter(1943991)}
                color="red"
              />
              <InfoBox
                count={formatter(467870)}
                text="Средние просмотры"
                icon={<Eye />}
                color="red"
              />
              <InfoBox
                count="03:06:04"
                text="Среднее время просмотра"
                icon={<Clock />}
                color="red"
              />
            </div>
            <div styleName="flex-col gr-4">
              <Card styleName="flex-obj">
                <CardBlock styleName="flex">
                  <Row>
                    <Col md={6}>
                      <GenderBlock sex="male" precent="66.6" />
                    </Col>
                    <Col md={6}>
                      <GenderBlock sex="female" precent="33.4" />
                    </Col>
                  </Row>
                </CardBlock>
              </Card>
              <Card styleName="flex-obj">
                <CardBlock styleName="flex">
                  <Row>
                    <Col xs={6} md={3}>
                      <div styleName="centered device">
                        <Laptop />
                        <div styleName="info">
                          <p>42.24%</p>
                          <small>Компьютеры</small>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div styleName="centered device">
                        <Tablet />
                        <div styleName="info">
                          <p>27.5%</p>
                          <small>Планшеты</small>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div styleName="centered device">
                        <Mobile />
                        <div styleName="info">
                          <p>27.5%</p>
                          <small>Планшеты</small>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6} md={3}>
                      <div styleName="centered device">
                        <Desktop />
                        <div styleName="info">
                          <p>2.39%</p>
                          <small>Телевизоры</small>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </CardBlock>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

