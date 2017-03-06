import React from 'react';
import importcss from 'importcss';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import Component from 'lsk-general/General/Component';
import Header from '../../containers/Header';

import PostCard from '../../components/PostCard';

@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid styleName="content">
          <Row>
            <Col xs={12} md={4}>
              <Card>
                <CardBlock>
                  <CardTitle>Категории</CardTitle>
                  <Nav bsStyle="pills" stacked activeKey={1}>
                    <NavItem eventKey={1}>NavItem 1 content</NavItem>
                    <NavItem eventKey={2}>NavItem 2 content</NavItem>
                    <NavItem eventKey={3}>NavItem 3 content</NavItem>
                  </Nav>
                </CardBlock>
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <PostCard>
                <PostCard.Head
                  id={1}
                  name="Андрей"
                  surname="Кондалов"
                  date={new Date()}
                  avatar="https://pp.userapi.com/c638020/v638020296/1a982/JmSvhUl4A4M.jpg"
                />
              </PostCard>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
