import React, { Component } from 'react';
import range from 'lodash/range';
import Story from '../Story';

import { Table, Row, Col } from './index';

class TableTest extends Component {
  render() {
    const { count = 10 } = this.props;
    const items = range(count);
    return (
      <Table
        // gap={24}
        // headerHeight={48}
        // itemHeight={64}
        // cellStyle={{
        //   border: '1px red solid',
        // }}
        // columns={['24px', '24px', 'minmax(180px, 1fr)', '108px', '64px', '64px', 'minmax(84px, 1fr)']}
        columns={{
          0: ['24px', '24px', 'minmax(180px, 1fr)', '108px', '64px', '64px', 'minmax(84px, 1fr)'],
          800: ['24px', '24px', 0, 0, 0, 0, 'minmax(84px, 1fr)'],
        }}
        // columns={(width) => ['24px', 'minmax(180px, 1fr)', '108px', '64px', '64px', 'minmax(84px, 1fr)']}
        // columns={columnsFn}
      >
        <Row>
          <Col index={0}>
            #
          </Col>
          <Col index={1}>
            Num
          </Col>
          <Col index={2}>
            Блогер
          </Col>
          <Col
            index={3}
            componentClass="button"
            onClick={e => console.log(e)}
          >
            Рейтинг
          </Col>
          <Col index={4}>
            Подписки
          </Col>
          <Col index={5}>
            Подп
          </Col>
          <Col index={6} align="right">
            Просмотры
          </Col>
        </Row>
        {items.map(() => (
          <Row>
            <Col index={0}>
              1
            </Col>
            <Col index={1}>
              2
            </Col>
            <Col index={2}>
              Some name
            </Col>
            <Col index={3}>
              12312
            </Col>
            <Col index={4}>
              44.23K
            </Col>
            <Col index={5}>
              1.02M
            </Col>
            <Col index={6} align="right">
              §123123123
            </Col>
          </Row>
        ))}
      </Table>
    );
  }
}


export default ({ storiesOf }) => {
  storiesOf('Table', module)
    .add('Default', () => (
      <Story devtools>
        <TableTest />
      </Story>
    ))
    .add('100 counts', () => (
      <Story devtools>
        <TableTest count={100} />
      </Story>
    ))
    .add('1000 counts', () => (
      <Story devtools>
        <TableTest count={1000} />
      </Story>
    ));
};
