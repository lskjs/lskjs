import React from 'react';
import range from 'lodash/range';
import random from 'lodash/random';
import sample from 'lodash/sample';
import { observer } from 'mobx-react';
import { css } from 'emotion';
import Promise from 'bluebird';

import { Row as BsRow, Col as BsCol } from '../../Grid';
// import { Row as BsRow, Col as BsCol } from 'react-bootstrap';

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
  padding: 5 12px;
  text-align: center;
  background: #eee;
`;

const ListItem = observer(({ item = {} }) => (
  <BsCol lg={2} md={3} sm={4} xs={6}>
    <div className={itemStyle}>
      <h2>{item.title}</h2>
      <p>{item.role}</p>
      <p>{item.rating}</p>
    </div>
  </BsCol>
));

const Body = BsRow;


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
    .add('case2', () => (
      <Story devtools style={{ padding: 24 }}>
        <List
          listStore={listStore}
          HeaderItem={HeaderItem}
          Body={Body}
          ListItem={ListItem}
          FilterForm={FilterForm}
          columns={columns}
        />
      </Story>
    ));
};
