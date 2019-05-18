import React, { Component } from 'react';
import Story from '@lskjs/dev/Story';
import range from 'lodash/range';
import { withTheme } from 'emotion-theming';

import { Table, Row, Col } from './index';

const columnsFn = ({ width }) => {
  return [
    {
      width: '24px',
      // className: 'hidden-sm', // sm md lg xl.
      style: {
        backgroundColor: 'red',
      },
    },
    {
      width: '24px',
      // className: 'hidden-sm', // sm md lg xl.
      style: {
        backgroundColor: 'red',
      },
    },
    {
      width: 'minmax(180px, 1fr)',
      // className: 'hidden-md', // sm md lg xl.
      style: {
        backgroundColor: 'yellow',
      },
      show: width > 800,
    },
    {
      width: '108px',
      // className: 'hidden-sm hidden-xs', // sm md lg xl.
      style: {
        backgroundColor: 'green',
      },
      show: width <= 800,
    },
    {
      width: '64px',
      // className: 'hidden-sm hidden-xs', // sm md lg xl.
      style: {
        backgroundColor: 'blue',
      },
    },
    {
      width: '64px',
      // className: 'hidden-md', // sm md lg xl.
      style: {
        backgroundColor: 'pink',
      },
    },
    {
      width: 'minmax(84px, 1fr)',
      // className: 'hidden-md', // sm md lg xl.
      style: {
        backgroundColor: 'brown',
      },
    },
  ];
};

@withTheme //eslint-disable-line
class GridTableTest extends Component {
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
        // columns={['24px', 'minmax(180px, 1fr)', '108px', '64px', '64px', 'minmax(84px, 1fr)']}
        // columns={{
        //   0: ['24px', 'minmax(180px, 1fr)', '108px', '64px', '64px', 'minmax(84px, 1fr)'],
        //   800: ['24px', 'minmax(180px, 1fr)', '108px', '64px', '64px', 'minmax(84px, 1fr)'],
        // }}
        // columns={(width) => ['24px', 'minmax(180px, 1fr)', '108px', '64px', '64px', 'minmax(84px, 1fr)']}
        columns={columnsFn}
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
          <Col index={5}>
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
            <Col align="right" index={6}>
              §123123123
            </Col>
          </Row>
        ))}
      </Table>
    );
  }
}


export default ({ storiesOf }) => {
  storiesOf('GridTable', module)
    .add('Default', () => (
      <Story devtools>
        <GridTableTest />
      </Story>
    ))
    .add('100 counts', () => (
      <Story devtools>
        <GridTableTest count={100} />
      </Story>
    ));
};
