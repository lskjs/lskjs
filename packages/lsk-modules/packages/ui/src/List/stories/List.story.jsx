import React from 'react';
import { observer } from 'mobx-react';
import Story from '../../Story';
import Input from '../../Input';
import Button from '../../Button';
import { ItemRow, ItemCol, HeaderRow, HeaderCol } from '../Table';
import { FormExample2 as FilterForm } from '../../Form2/stories/examples/FormExample2.story';

import List from '../List';
import listStore from './listStore';
import { createIndex } from '../../GridTable/index';
import DebugListStore from './DebugListStore';

const columns = [60, '1fr', '1fr', 60];
const HeaderItem = ({ toggleSort, sort = {}, index = createIndex() }) => (
  <HeaderRow>
    <HeaderCol index={index()}>
      <List.SortHeader value={sort.id} onClick={() => toggleSort('id')}>
       id
      </List.SortHeader>
    </HeaderCol>
    <HeaderCol index={index()}>
      name
    </HeaderCol>
    <HeaderCol index={index()}>
      <List.SortHeader value={sort.role} onClick={() => toggleSort('role')}>
       role
      </List.SortHeader>
    </HeaderCol>
    <HeaderCol index={index()}>
      <List.SortHeader value={sort.rating} onClick={() => toggleSort('rating')}>
        rating
      </List.SortHeader>
    </HeaderCol>
  </HeaderRow>
);

const Item = observer(({ item = {}, index = createIndex() }) => (
  <ItemRow>
    <ItemCol index={index()}>
      {item.id}
    </ItemCol>
    <ItemCol index={index()}>
      {item.title}
    </ItemCol>
    <ItemCol index={index()}>
      {item.role}
    </ItemCol>
    <ItemCol index={index()}>
      {item.rating}
    </ItemCol>
  </ItemRow>
));
const LargeItem = observer(({ item = {}, index = createIndex() }) => (
  <ItemRow>
    <ItemCol index={index()}>
      {item.id}
    </ItemCol>
    <ItemCol index={index()}>
      {item.title}
    </ItemCol>
    <ItemCol index={index()}>
      {item.role}
    </ItemCol>
    <ItemCol index={index()}>
      {item.rating}
    </ItemCol>
  </ItemRow>
));
const EditItem = observer(({ item = {}, index = createIndex() }) => (
  <ItemRow>
    <ItemCol index={index()}>
      {item.title}
    </ItemCol>
    <ItemCol index={index()}>
      <Input
        value={item.title}
        onChange={(title) => {
          item.title = title;
        }}
      />
    </ItemCol>
    <ItemCol index={index()}>
      <Button
        paint="danger"
        onClick={() => {
          listStore.items = listStore.items.filter(({ id }) => {
            return id !== item.id;
          });
        }}
      >
        Удалить
      </Button>
    </ItemCol>
    <ItemCol index={index()}>
      <Button
        paint="success"
        onClick={() => {
          const { id } = listStore.items[listStore.items.length - 1];
          listStore.items.push({ id: id + 1, title: `New ${id + 1}` });
        }}
      >
        Добавить
      </Button>
    </ItemCol>
  </ItemRow>
));

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
        <DebugListStore store={listStore} />
      </Story>
    ))
    .add('large', () => (
      <Story devtools style={{ padding: 24 }}>
        <List
          container
          listStore={listStore}
          HeaderItem={HeaderItem}
          Item={LargeItem}
          FilterForm={FilterForm}
          columns={columns}
        />
        <DebugListStore store={listStore} />
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
        <DebugListStore store={listStore} />
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
        <DebugListStore store={listStore} />
      </Story>
    ));
};
