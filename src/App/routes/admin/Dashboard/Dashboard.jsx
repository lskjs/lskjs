import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import StatBox from 'lsk-admin/Admin/lib/widgets/StatBox';
import InfoBox from 'lsk-admin/Admin/lib/widgets/InfoBox';
import Users from 'react-icons/lib/fa/group';
import Star from 'react-icons/lib/fa/star-o';

export default class Dashboard extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Row>
            <Col md={4}>
              <StatBox
                count="6"
                title="Новые пользователи"
                iconClasses={<Users />}
                url="/admin/users"
                urlText="Перейти"
                color="yellow"
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12}>
          <Row>
            <Col md={3}>
              <InfoBox
                icon={<Star />}
                text="Лайков"
                count="93,139"
                color="green"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
