import React from 'react';
import SearchIcon from 'react-icons2/mdi/magnify';
import Container from 'reactstrap/lib/Container';
import { Col, Row } from '../Grid';
import Story from '../Story';
import Input from '../Input';
import Button from '../Button';
import Portfoliocard from '../UI/molecules/PortfolioCard';
import Header from '../UI/atoms/Header';

const articles = [
  {
    image: 'https://picsum.photos/300/200',
    href: '',
    title: 'Lorem ipsum dolor',
    subtitle: 'PSD',
  },
];
export default ({ storiesOf }) => (
  storiesOf('hz/Companies', module)
    .add('Default', () => (
      <Story>
        <Container>
          <Header>Services</Header>
          <div style={{ display: 'flex' }}>
            <Input placeholder="Search...." style={{ width: '100%' }} />
            <Button iconRight={<SearchIcon />} size="small" />
          </div>
          <Row style={{ marginBottom: 20 }}>
            <Col md={4}>
            §
              <Portfoliocard {...articles[0]} />
            </Col>
            <Col md={4}>
              <Portfoliocard {...articles[0]} />
            </Col>
            <Col md={4}>
              <Portfoliocard {...articles[0]} />
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col md={4}>
              <Portfoliocard {...articles[0]} />
            </Col>
            <Col md={4}>
              <Portfoliocard {...articles[0]} />
            </Col>
            <Col md={4}>
              <Portfoliocard {...articles[0]} />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Portfoliocard {...articles[0]} />
            </Col>
            <Col md={4}>
              <Portfoliocard {...articles[0]} />
            </Col>
            <Col md={4}>
              <Portfoliocard {...articles[0]} />
            </Col>
          </Row>
        </Container>
      </Story>
    ))
);
