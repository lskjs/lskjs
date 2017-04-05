import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBlock,
} from 'react-bootstrap';
import css from 'importcss';

import Male from 'react-icons/lib/fa/male';
import Female from 'react-icons/lib/fa/female';
// import Female from '~/utils/formatter';

export function formatter(value) {
  const arr = [];
  String(value).split('').reverse().forEach((c, i) => {
    if (i % 3 === 0) arr.push(' ');
    arr.push(c);
  });
  return arr.reverse().join('').trim();
}

@css(require('./DashboardPage.css'))
export default class DashboardPage extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col sm={4}>
              <Card>
                <CardBlock styleName="centered">
                  <div styleName="value">{formatter(1943991)}</div>
                  <div styleName="key">подписчики</div>
                </CardBlock>
              </Card>
              <Card>
                <CardBlock styleName="centered">
                  <div styleName="value">{formatter(467870)}</div>
                  <div styleName="key">средние просмотры</div>
                </CardBlock>
              </Card>
              <Card>
                <CardBlock styleName="centered">
                  <div styleName="value">03:06:04</div>
                  <div styleName="key">среднее время просмотра</div>
                </CardBlock>
              </Card>
            </Col>
            <Col sm={8}>
              <Card>
                <CardBlock styleName="flex">
                  <Row>
                    <Col sm={6}>
                      <GenderBlock sex="male" precent="66.6" />
                    </Col>
                    <Col sm={6}>
                      <GenderBlock sex="female" precent="33.4" />
                    </Col>
                  </Row>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

@css(require('./DashboardPage.css'))
class GenderBlock extends Component {
  render() {
    const { sex, precent } = this.props;
    return (
      <div styleName="gender-block">
        <div styleName="gender-block-stat">
          {sex === 'male' && <Male />}
          {sex === 'female' && <Female />}
          <div>{`${precent}%`}</div>
        </div>
        <div styleName="gender-block-info">
          <GenderGraph name="13-17" value="22" />
          <GenderGraph name="18-24" value="26" />
          <GenderGraph name="25-34" value="24" />
          <GenderGraph name="35+" value="8" />
        </div>
      </div>
    );
  }
}

@css(require('./DashboardPage.css'))
class GenderGraph extends Component {
  render() {
    const { name, value } = this.props;
    return (
      <div styleName="gender-graph">
        <span>{name}</span>
        <div styleName="progressbar-wrapper">
          <div styleName="progressbar-container">
            <div
              styleName="progressbar-progress"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      </div>
    );
  }
}
