import React, { Component } from 'react'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'
import { Grid, Row, Col } from 'react-bootstrap';

// @importcss(require('./HomePage.css'))
@inject('app')
@inject('user')
@observer
export default class ProfilePage extends Component { //eslint-disable-line

  render() {
    const user = this.props.user

    return (
        <Grid>
          <Row>
            <Col md={4} sm={6} xs={12}>
                {JSON.stringify(user)}
                {JSON.stringify(this.props.app.auth.user)}
            </Col>

          </Row>
        </Grid>
    );
  }
}
