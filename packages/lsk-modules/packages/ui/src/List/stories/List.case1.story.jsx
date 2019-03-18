import React from 'react';
import range from 'lodash/range';
import random from 'lodash/random';
import sample from 'lodash/sample';
import { observer } from 'mobx-react';
import { css } from 'emotion';
import cx from 'classnames';
import Promise from 'bluebird';

import Story from '../../Story';
import { Row, Col } from '../../Table';
import ListStore from '../../stores/ListStore';
import { FormExample2 as FilterForm } from '../../Form2/stories/examples/FormExample2.story';

import List from '../List';

Promise.config({ cancellation: true });
const api = {
  async find({ skip, limit, cancelToken } = {}) {
    const promise = Promise.delay(200); // это типа гет запрос
    cancelToken.token.promise.then(() => promise.cancel());
    await promise;
    const count = 1000;
    const roles = () => sample(['Director', 'Manager', 'Stuff', 'Salesman', 'Driver', 'Tester', 'Designer']);
    return {
      count,
      items: range(skip, skip + limit).map(id => ({
        id,
        title: `User ${id + 1}`,
        rating: random(id, count, true).toFixed(2),
        role: roles(),
      })),
    };
  },
};

const listStore = new ListStore({ api });
setTimeout(() => {
  listStore.fetch();
}, 2000);

const columns = [60, '1fr', '1fr', 60];

const styleHeight = css`
  height: 100%;
  min-height: 48px;
  align-items: center;
`;

const itemStyle = css`
  padding: 0 12px;
`;

const ListItem = observer(({ item = {} }) => (
  <Row className={cx([styleHeight, itemStyle])}>
    <Col index={0}>
      {item.id}
    </Col>
    <Col index={1}>
      {item.title}
    </Col>
    <Col index={2}>
      {item.role}
    </Col>
    <Col index={3}>
      {item.rating}
    </Col>
  </Row>
));


const SortDirection = ({ value }) => (value === 1 ? '⬆' : value === -1 ? '⬇' : '⚬');

const HeaderItem = ({ toggleSort, sort = {} }) => (
  <Row className={styleHeight}>
    <Col index={0} onClick={() => toggleSort('id')}>
      id
      <SortDirection value={sort.id} />
    </Col>
    <Col index={1}>
      name
    </Col>
    <Col index={2} onClick={() => toggleSort('role')}>
      role
      <SortDirection value={sort.role} />
    </Col>
    <Col index={3} onClick={() => toggleSort('rating')}>
      rating
      <SortDirection value={sort.rating} />
    </Col>
  </Row>
);


export default ({ storiesOf }) => {
  return storiesOf('List/cases', module)
    .add('case1', () => (
      <Story devtools style={{ padding: 24 }}>
        <List
          listStore={listStore}
          HeaderItem={HeaderItem}
          ListItem={ListItem}
          FilterForm={FilterForm}
          columns={columns}
        />
      </Story>
    ));
};
