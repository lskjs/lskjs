import React from 'react';
import importcss from 'importcss';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import Component from 'lsk-general/General/Component';
import Header from '../../components/Header';
import PostCard from '../../components/PostCard';

@inject('user') @observer
@importcss(require('./HomePage.css'))
export default class HomePage extends Component {
  render() {
    const { user } = this.props;
    console.log(user.toJS)
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
                  id={user._id}
                  name={user.name}
                  surname={user.surname}
                  date={new Date()}
                  avatar={user.avatar}
                />
              </PostCard>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
