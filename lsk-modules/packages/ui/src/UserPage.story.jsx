import React from 'react';
import Container from 'reactstrap/lib/Container';
import { Col, Row } from './Grid';
import Story from './Story';
import './styles/lib/antd.g.css';
import './styles/lib/bootstrap.g.css';
import Button from './Button';
import Page from './UI/molecules/Page';
import Box from './UI/molecules/Box';
import UserBoxFooter from './UI/molecules/UserBoxFooter';


export default ({ storiesOf }) => (
  storiesOf('hz/UserPage', module)
    .add('Default', () => (
      <Story>
        <Container>
          <Page>
            <Page.Title>
              Страница пользователя
            </Page.Title>
            <Box image="https://picsum.photos/1280/720/?random" style={{ height: 380 }}>
              <UserBoxFooter
                user={{
                  title: 'Иван Иванович',
                  avatar: 'https://picsum.photos/200?random',
                  _id: 1,
                }}
                subtitle="Технический директор"
                actions={(
                  <Button>Редактировать</Button>
                )}
              />
            </Box>
            <Row style={{ paddingTop: 30 }}>
              <Col md={6} style={{ paddingBottom: 30 }}>
                <Box padded>
                  <Box.Header>
                    О себе
                  </Box.Header>
                  <Box.Body>
                    Тут будет информация о юзере
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur, quasi nam.
                    Nisi assumenda nulla consequatur perferendis, voluptatum,
                    laborum provident eos amet quos, ullam possimus facilis quasi?
                    Magnam optio voluptates ipsam.
                  </Box.Body>
                </Box>
              </Col>
              <Col md={6} style={{ paddingBottom: 30 }}>
                <Box padded>
                  <Box.Header>
                    Интересы
                  </Box.Header>
                  <Box.Body>
                    Тут будут интересы юзера
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur, quasi nam.
                    Nisi assumenda nulla consequatur perferendis, voluptatum,
                    laborum provident eos amet quos, ullam possimus facilis quasi?
                    Magnam optio voluptates ipsam.
                  </Box.Body>
                </Box>
              </Col>
            </Row>
            <Row>
              <Col md={6} style={{ paddingBottom: 30 }}>
                <Box padded>
                  <Box.Header>
                    Предыдущая работа
                  </Box.Header>
                  <Box.Body>
                    Тут будет информация о предыдущей работе
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Tenetur, quasi nam.
                    Nisi assumenda nulla consequatur perferendis, voluptatum,
                    laborum provident eos amet quos, ullam possimus facilis quasi?
                    Magnam optio voluptates ipsam.
                  </Box.Body>
                </Box>
              </Col>
            </Row>
          </Page>
        </Container>
      </Story>
    ))
);
