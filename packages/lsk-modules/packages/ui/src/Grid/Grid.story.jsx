import React from 'react';
import Story from '../Story';
import { Container, Row, Col } from './index';

const defaultStyle = {
  height: 100,
  background: '#3599c3',
  color: '#ddddce',
  fontSize: 16,
};
const Item = ({ style, ...props }) => <div style={{ ...defaultStyle, ...style }} {...props} />;

export default ({ storiesOf }) => {
  storiesOf('Grid', module)
    .add('Default', () => (
      <Story style={{ background: '#42cafd' }}>
        <Container>
          <Row>
            <Col lg={6} md={12}>
              <Item>
                lg-6 md-12
              </Item>
            </Col>
            <Col lg={2} md={4} xs={6}>
              <Item>
                lg-2 md-4 xs-6
              </Item>
            </Col>
            <Col lg={2} md={4} xs={6}>
              <Item>
                lg-2 md-4 xs-6
              </Item>
            </Col>
            <Col lg={2} md={4} xs={12}>
              <Item>
                lg-2 md-4 xs-12
              </Item>
            </Col>
          </Row>
        </Container>
      </Story>
    ))
    .add('Vertical offsets', () => (
      <Story style={{ background: '#42cafd' }}>
        <Container>
          <Row vertical>
            <Col lg={6} md={12}>
              <Item>
                lg-6 md-12
              </Item>
            </Col>
            <Col lg={2} md={4} xs={6}>
              <Item style={{ height: 50 }}>
                lg-2 md-4 xs-6
              </Item>
            </Col>
            <Col lg={2} md={4} xs={6}>
              <Item style={{ height: 150 }}>
                lg-2 md-4 xs-6
              </Item>
            </Col>
            <Col lg={2} md={4} xs={12}>
              <Item>
                lg-2 md-4 xs-12
              </Item>
            </Col>
          </Row>
        </Container>
      </Story>
    ))
    .add('Custom gap', () => (
      <Story style={{ background: '#42cafd' }}>
        <Container>
          <Row vertical gap={32}>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
          </Row>
        </Container>
      </Story>
    ))
    .add('Vertical offsets with custom gap', () => (
      <Story style={{ background: '#42cafd' }}>
        <Container>
          <Row vertical gap={6}>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
            <Col md={4}>
              <Item>
                Col 4
              </Item>
            </Col>
          </Row>
        </Container>
      </Story>
    ))
    .add('without container', () => (
      <Story style={{ background: '#42cafd' }}>
        <Row>
          <Col md={4}>
            <Item>
              Col 4
            </Item>
          </Col>
          <Col md={4}>
            <Item>
              Col 4
            </Item>
          </Col>
          <Col md={4}>
            <Item>
              Col 4
            </Item>
          </Col>
        </Row>
      </Story>
    ))
    .add('complex', () => (
      <Story style={{ background: '#42cafd' }}>
        <Container>
          <Row vertical>
            <Col md={4}>
              <Item>
              a
              </Item>
            </Col>
            <Col md={4}>
              <Item>
              a
              </Item>
            </Col>
            <Col md={4}>
              <Item>
              a
              </Item>
            </Col>
            <Col md={4}>
              <Item>
              a
              </Item>
            </Col>
            <Col md={4}>
              <Item>
              a
              </Item>
            </Col>
            <Col md={4}>
              <Item>
                <Row vertical>
                  <Col md={6}>
                    <Item style={{ background: '#68977c' }}>
                     b
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item style={{ background: '#68977c' }}>
                     b
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item style={{ background: '#68977c' }}>
                     b
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item style={{ background: '#68977c' }}>
                     b
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item style={{ background: '#68977c' }}>
                     b
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item style={{ background: '#68977c' }}>
                     b
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item style={{ background: '#68977c' }}>
                     b
                    </Item>
                  </Col>
                  <Col md={6}>
                    <Item style={{ background: '#68977c' }}>
                     b
                    </Item>
                  </Col>
                </Row>
              </Item>
            </Col>
          </Row>
        </Container>
      </Story>
    ));
};
