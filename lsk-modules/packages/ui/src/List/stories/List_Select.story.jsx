import React from 'react';
import { observer } from 'mobx-react';

import Link from '../../Link';
import Story from '../../Story';
import { Row, Col, ItemRow, ItemCol, HeaderRow, HeaderCol } from '../Table';

import List from '../List';
import listStore from './listStore';
import DebugListStore from './DebugListStore';

const columns = [60, '1fr', '1fr', 60];
const SelectHeaderItem = observer(({ toggleSort, sort = {} }) => (
  <HeaderRow>
    <HeaderCol index={0}>
      <List.Checkbox global />
    </HeaderCol>
    <HeaderCol index={1}>
      <List.SortHeader style={{ background: '#eee' }} value={sort.id} onClick={() => toggleSort('id')}>
       id
      </List.SortHeader>
    </HeaderCol>
    <HeaderCol index={2}>
      name
    </HeaderCol>
    <List.SortHeader value={sort.role} onClick={() => toggleSort('role')}>
      <HeaderCol index={3} style={{ background: '#eee' }}>
        role
      </HeaderCol>
    </List.SortHeader>
  </HeaderRow>
));

const SelectItem = observer(({ item = {} }) => (
  <ItemRow
    // clickable
    // checked={listStore.selectStore.isChecked(item)}
    // onClick={() => listStore.selectStore.toggle(item)}
  >
    <ItemCol index={0}>
      <List.Checkbox item={item} />
    </ItemCol>
    <ItemCol index={1}>
      {item.id} - {Math.random()}
    </ItemCol>
    <ItemCol index={2}>
      {item.title}
    </ItemCol>
    <ItemCol index={3}>
      {item.role}
    </ItemCol>
  </ItemRow>
));

const SelectLinkItem = observer(({ item = {} }) => (
  <List.SelectRow item={item} componentClass={Link} href="https://google.com">
    <ItemRow clickable>
      <ItemCol index={0}>
        <List.Checkbox item={item} />
      </ItemCol>
      <ItemCol index={1}>
        {item.id} - {Math.random()}
      </ItemCol>
      <ItemCol index={2}>
        {item.title}
      </ItemCol>
      <ItemCol index={3}>
        {item.role}
      </ItemCol>
    </ItemRow>
  </List.SelectRow>
));

const SelectLinkItem2 = observer(({ item = {} }) => (
  <Link href="https://google.com">
    <Row>
      <Col index={0}>
        {/* <List.Checkbox item={item} /> */}
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
  </Link>
));

const SelectLinkItem3 = observer(({ item = {} }) => (
  <List.SelectRow item={item}>
    <Row>
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
  </List.SelectRow>
));

export default ({ storiesOf }) => {
  return storiesOf('List/Select', module)
    .add('List with Select', () => (
      <Story>
        <List
          listStore={listStore}
          Item={SelectItem}
          HeaderItem={SelectHeaderItem}
          columns={columns}
        />
        <DebugListStore store={listStore} />
      </Story>
    ))
    .add('List with SelectLinkItem', () => (
      <Story>
        <List
          listStore={listStore}
          Item={SelectLinkItem}
          HeaderItem={SelectHeaderItem}
          columns={columns}
        />
        <DebugListStore store={listStore} />
      </Story>
    ))
    .add('List with SelectLinkItem2', () => (
      <Story>
        <List
          listStore={listStore}
          Item={SelectLinkItem2}
          HeaderItem={SelectHeaderItem}
          columns={columns}
        />
        <DebugListStore store={listStore} />
      </Story>
    ))
    .add('List with SelectLinkItem3', () => (
      <Story>
        <List
          listStore={listStore}
          Item={SelectLinkItem3}
          HeaderItem={SelectHeaderItem}
          columns={columns}
        />
        <DebugListStore store={listStore} />
      </Story>
    ));
};
