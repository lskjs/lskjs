
import React, { Component } from 'react';
// import importcss from 'importcss';
// import { autobind } from 'core-decorators';
// import { inject } from 'mobx-react';
import {
  Card,
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import Loading from 'react-icons/lib/md/refresh';
import Error from 'react-icons/lib/md/clear';
import Check from 'react-icons/lib/md/check';

import Slide from 'lsk-general/General/Slide';
import Link from 'lsk-general/General/Link';

import Header from '../../components/Header';

// @inject('app')
export default class ErrorPage extends Component {

  render() {
    const { type } = this.props;
    console.log(this.props);
    return (
      <div>
        <Header siteTitle={this.props.siteTitle} />
        <Slide
          full
          video="http://skill-branch.ru/video-background.webm"
          overlay
        >
          <Grid>
            <Row>
              <Col md={4} mdOffset={4}>
                <Card>
                  <CardBlock>
                    <CardTitle>
                      {this.props.title || 'Ошибка'}
                    </CardTitle>
                    <CardText>
                      {this.props.children}
                    </CardText>
                  </CardBlock>
                </Card>
                <Card>
                  <CardBlock className="text-xs-center" style={{ textAlign: 'center' }}>
                    <Button
                      componentClass={Link}
                      href="/"
                      block
                    >
                        Перейти на главную страницу
                      </Button>
                  </CardBlock>
                </Card>
              </Col>
            </Row>
          </Grid>
        </Slide>
      </div>
    );
  }
}
