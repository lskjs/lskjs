import React, { Component } from 'react';
import range from 'lodash/range';
import random from 'lodash/random';
import sample from 'lodash/sample';
import omit from 'lodash/omit';
import { observer } from 'mobx-react';
import { css } from '@emotion/core';
import cx from 'classnames';
import Promise from 'bluebird';
import axios from 'axios';

// import DEV from '../DEV';
import Link from '../Link';
import Story from '../Story';
import Input from '../Input';
import Button from '../Button';
import { Row, Col } from '../Table';
import ObserverDEV from '../DEV/ObserverDEV';
import ListStore from '../stores/ListStore';
import { FormExample2 as FilterForm } from '../Form2/stories/examples/FormExample2.story';

import List from './List';

Promise.config({ cancellation: true });
const api = {
  async find2({ skip, limit } = {}) {
    await Promise.delay(200);
    return {
      count: 1000,
      items: range(skip, skip + limit).map(id => ({ id, title: `User ${id + 1}` })),
    };
  },

  async find({ skip, limit, cancelToken } = {}) {
    const promise = Promise.delay(200); // это типа гет запрос
    cancelToken.token.promise.then(() => promise.cancel());
    await promise;
    const count = 1000;
    const roles = () => sample([
      'Director',
      'Manager',
      'Stuff',
      'Salesman',
      'Driver',
      'Tester',
      'Designer',
    ]);
    return {
      count,
      data: range(skip, skip + limit).map(id => ({
        id,
        _id: id,
        title: `User ${id + 1}`,
        rating: random(id, count, true).toFixed(2),
        role: roles(),
      })),
      // items: range(skip, skip + limit).map(_id => ({ _id })),
    };
  },


  async find3({ skip, limit, cancelToken } = {}) {
    await axios.get('/user/12345', { cancelToken: cancelToken.token });
    await axios.get('/user/12345', { cancelToken: cancelToken.token });
    await axios.get('/user/12345', { cancelToken: cancelToken.token });
    return {
      count: 1000,
      items: range(skip, skip + limit).map(id => ({ id, title: `User ${id + 1}` })),
    };
    // });
  },

  find4({ skip, limit } = {}) {
    return Promise(async (resolve, reject, onCancel) => {
      const promise = Promise.delay(2000); // это типа гет запрос
      onCancel(promise.cancel);
      await promise;

      const promise2 = Promise.delay(2000); // это типа гет запрос
      onCancel(promise2.cancel);
      await promise2;

      const promise3 = Promise.delay(2000); // это типа гет запрос
      onCancel(promise3.cancel);
      await promise3;

      resolve({
        count: 1000,
        items: range(skip, skip + limit).map(id => ({ id, title: `User ${id + 1}` })),
      });
    });
  },
};

const listStore = new ListStore({ api, skip: 20 });
// setTimeout(() => {
//   listStore.fetch();
// }, 2000);

const columns = [60, '1fr', '1fr', 60];

const styleHeight = css`
  height: 100%;
  min-height: 48px;
  align-items: center;
`;

const itemStyle = css`
  padding: 0 12px;
`;

const Item = observer(({ item = {} }) => (
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
const EditItem = observer(({ item = {} }) => (
  <Row className={cx([styleHeight, itemStyle])}>
    <Col index={0}>
      {item.title}
    </Col>
    <Col index={1}>
      <Input
        value={item.title}
        onChange={(title) => {
          item.title = title;
        }}
      />
    </Col>
    <Col index={2}>
      <Button
        onClick={() => {
          listStore.items = listStore.items.filter(({ id }) => {
            return id !== item.id;
          });
        }}
      >
        Удалить
      </Button>
    </Col>
    <Col index={3}>
      <Button
        onClick={() => {
          const { id } = listStore.items[listStore.items.length - 1];
          listStore.items.push({ id: id + 1, title: `New ${id + 1}` });
        }}
      >
        Добавить
      </Button>
    </Col>
  </Row>
));

const SelectItem = observer(({ item = {} }) => (
  <Row className={cx([styleHeight, itemStyle])}>
    <Col index={0}>
      <List.Checkbox item={item} />
    </Col>
    <Col index={1}>
      {item.id} - {Math.random()}
    </Col>
    <Col index={2}>
      {item.title}
    </Col>
    <Col index={3}>
      {item.role}
    </Col>
  </Row>
));
const SelectLinkItem = observer(({ item = {} }) => (
  <Row className={cx([styleHeight, itemStyle])} componentClass={Link} href="https://google.com" clickable>
    <Col index={0}>
      <List.Checkbox item={item} style={{ marginBottom: 0 }} />
    </Col>
    <Col index={1}>
      {item.id} - {Math.random()}
    </Col>
    <Col index={2}>
      {item.title}
    </Col>
    <Col index={3}>
      {item.role}
    </Col>
  </Row>
));

const SelectHeaderItem = observer(({ toggleSort, sort = {} }) => (
  <Row className={styleHeight}>
    <Col index={0}>
      <List.Checkbox global />
    </Col>
    <Col index={1}>
      <List.SortHeader value={sort.id} onClick={() => toggleSort('id')}>
       id
      </List.SortHeader>
    </Col>
    <Col index={2}>
      name
    </Col>
    <Col index={3}>
      <List.SortHeader value={sort.role} onClick={() => toggleSort('role')}>
       role
      </List.SortHeader>
    </Col>
  </Row>
));

const HeaderItem = ({ toggleSort, sort = {} }) => (
  <Row className={styleHeight}>
    <Col index={0}>
      <List.SortHeader value={sort.id} onClick={() => toggleSort('id')}>
       id
      </List.SortHeader>
    </Col>
    <Col index={1}>
      name
    </Col>
    <Col index={2}>
      <List.SortHeader value={sort.role} onClick={() => toggleSort('role')}>
       role
      </List.SortHeader>
    </Col>
    <Col index={3}>
      <List.SortHeader value={sort.rating} onClick={() => toggleSort('rating')}>
        rating
      </List.SortHeader>
    </Col>
  </Row>
);

class Debug extends Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        <button onClick={() => this.forceUpdate()}>
          forceUpdate
        </button>
        <button onClick={() => store.fetch()}>
          fetch
        </button>
        <button onClick={() => store.fetch({ skip: 5, limit: 5, cache: true })}>
          fetch 5-10 cache
        </button>
        <button onClick={() => store.fetch({ skip: 40, limit: 5, cache: true })}>
          fetch 40-45 cache
        </button>
        <ObserverDEV json={omit(store, ['selectStore'])} />
        <ObserverDEV json={omit(store.selectStore, ['listStore'])} />
      </div>
    );
  }
}

export default ({ storiesOf }) => {
  return storiesOf('List', module)
    .add('default', () => (
      <Story devtools style={{ padding: 24 }}>
        <List
          container
          listStore={listStore}
          HeaderItem={HeaderItem}
          Item={Item}
          FilterForm={FilterForm}
          columns={columns}
        />
        <Debug store={listStore} />
      </Story>
    ))
    // .add('children', () => (
    //   <Story>
    //     <List>
    //       List content
    //     </List>
    //   </Story>
    // ))
    .add('List.Header', () => (
      <Story>
        <List
          listStore={listStore}
          HeaderItem={HeaderItem}
          FilterForm={FilterForm}
          columns={columns}
        >
          <List.Header />
          <Debug store={listStore} />
        </List>
      </Story>
    ))
    .add('List.Search', () => (
      <Story>
        <List
          listStore={listStore}
        >
          <List.Search />
          <Debug store={listStore} />
        </List>
      </Story>
    ))
    .add('List.Filter', () => (
      <Story>
        <List
          listStore={listStore}
          FilterForm={FilterForm}
        >
          <List.Filter visible />
          <Debug store={listStore} />
        </List>
      </Story>
    ))
    .add('List.Filter x2', () => (
      <Story>
        <List
          listStore={listStore}
          FilterForm={FilterForm}
        >
          <List.Filter visible />
          <List.Filter visible />
          <List.Tags visible />
          <Debug store={listStore} />
        </List>
      </Story>
    ))
    .add('List.Tags', () => (
      <Story>
        <List
          listStore={listStore}
        >
          <List.Tags />
          <Debug store={listStore} />
        </List>
      </Story>
    ))
    .add('List.HeaderRow', () => (
      <Story>
        <List
          listStore={listStore}
          HeaderItem={HeaderItem}
          columns={columns}
        >
          <List.HeaderRow />
          <Debug store={listStore} />
        </List>
      </Story>
    ))
    .add('List.Body', () => (
      <Story>
        <List
          listStore={listStore}
          Item={Item}
          columns={columns}
        >
          <List.Body Item={Item} />
        </List>
        <Debug store={listStore} />
      </Story>
    ))
    .add('List.Checkbox', () => (
      <Story>
        <List
          listStore={listStore}
          Item={SelectLinkItem}
          columns={columns}
        >
          <List.Body Item={SelectLinkItem} />
        </List>
        <Debug store={listStore} />
      </Story>
    ))
    .add('List.Footer', () => (
      <Story>
        <List
          listStore={listStore}
        >
          <List.Footer />
        </List>
        <Debug store={listStore} />
      </Story>
    ))
    .add('List.Footer x2', () => (
      <Story>
        <List
          listStore={listStore}
        >
          <List.Footer />
          <List.Footer />
        </List>
        <Debug store={listStore} />
      </Story>
    ))
    .add('List.Paginator', () => (
      <Story>
        <List
          listStore={listStore}
        >
          <List.Paginator />
        </List>
        <Debug store={listStore} />
      </Story>
    ))
    .add('List.Empty', () => (
      <Story>
        <List
          listStore={listStore}
        >
          <List.Empty type={1} />
        </List>
        <Debug store={listStore} />
      </Story>
    ))
    .add('custom wrappers', () => (
      <Story devtools style={{ padding: 24 }}>
        <List
          container
          listStore={listStore}
          HeaderItem={HeaderItem}
          Item={Item}
          FilterForm={FilterForm}
          columns={columns}
          Wrapper={({ children }) => <div style={{ background: 'red' }}>{children}</div>}
        />
        <Debug store={listStore} />
      </Story>
    ))
    .add('List Add Remove Edit', () => (
      <Story devtools style={{ padding: 24 }}>
        <List
          container
          listStore={listStore}
          HeaderItem={HeaderItem}
          Item={EditItem}
          FilterForm={FilterForm}
          columns={['1fr', '1fr', '1fr', '1fr']}
        />
        <Debug store={listStore} />
      </Story>
    ))
    .add('List with Select', () => (
      <Story>
        <List
          listStore={listStore}
          Item={SelectItem}
          HeaderItem={SelectHeaderItem}
          columns={columns}
        />
        <Debug store={listStore} />
      </Story>
    ));
  // .add('props Item', () => (
  //   <Story>
  //     <List
  //       Item={Item}
  //     />
  //   </Story>
  // ))
  // .add('props HeaderItem', () => (
  //   <Story>
  //     <List
  //       HeaderItem={HeaderItem}
  //     />
  //   </Story>
  // ))
  // .add('props Item + HeaderItem + columns', () => (
  //   <Story>
  //     <List
  //       columns={['minmax(180px, 1fr)', 108, 64, 64, 'minmax(84px, 1fr)']}
  //       HeaderItem={HeaderItem}
  //       Item={Item}
  //     />
  //   </Story>
  // ))
  // .add('children - without footer', () => (
  //   <Story>
  //     <List
  //       columns={['minmax(180px, 1fr)', 108, 64, 64, 'minmax(84px, 1fr)']}
  //       Item={Item}
  //       HeaderItem={HeaderItem}
  //     >
  //       <List.Header />
  //       <List.Body />
  //     </List>
  //   </Story>
  // ))
  // .add('custome Header', () => (
  //   <Story>
  //     <List
  //       columns={['minmax(180px, 1fr)', 108, 64, 64, 'minmax(84px, 1fr)']}
  //       Item={Item}
  //       HeaderItem={HeaderItem}
  //     >
  //       <List.Header>
  //         Custom header
  //       </List.Header>
  //       <List.Body />
  //       <List.Footer />
  //     </List>
  //   </Story>
  // ))
  // .add('custom Header', () => (
  //   <Story>
  //     <List
  //       columns={['minmax(180px, 1fr)', 108, 64, 64, 'minmax(84px, 1fr)']}
  //       Item={Item}
  //       HeaderItem={HeaderItem}
  //     >
  //       <List.Header>
  //         Custom header
  //       </List.Header>
  //       <List.Body />
  //       <List.Footer />
  //     </List>
  //   </Story>
  // ))
  // .add('custom Body table', () => (
  //   <Story>
  //     <List
  //       columns={['minmax(180px, 1fr)', 108, 64, 64, 'minmax(84px, 1fr)']}
  //       Item={Item}
  //       HeaderItem={HeaderItem}
  //     >
  //       <List.Header />
  //       <List.Body>
  //         Custom Body
  //       </List.Body>
  //       <List.Footer />
  //     </List>
  //   </Story>
  // ));
};
