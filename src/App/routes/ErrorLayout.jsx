import React, { Component } from 'react';
import {
  Card,
  CardBlock,
  CardTitle,
  CardText,
  Grid,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

import Slide from 'lsk-general/General/Slide';
import Link from 'lsk-general/General/Link';
import Navbar from './Navbar';

// @inject('app')
export default class ErrorLayout extends Component {

  render() {
    const { type } = this.props;
    return (
      <div>
        <Navbar />
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
