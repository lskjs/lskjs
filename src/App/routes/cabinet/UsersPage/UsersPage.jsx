import React, { Component, PropTypes } from 'react';
import { Card, CardBlock, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import Link from 'lsk-general/General/Link';
import moment from 'moment';

@observer
export default class UsersPage extends Component {

  static propTypes = {
    users: PropTypes.object.isRequired,
  }

  nameFormatter(data, cell) {
    return `<p>${cell[data]}</p>`;
  }

  nameDate(data, cell) {
    return `<p>${moment(cell[data]).locale('ru').format('LL')}</p>`;
  }

  addButton(data) {
    return (
      <Link href={`/cabinet/user/${data}`}>Перейти</Link>
    );
  }

  render() {
    const { users } = this.props;
    return (
      <Card>
        <CardBlock>
          <BootstrapTable data={users.list} bordered={false}>
            <TableHeaderColumn isKey dataField="_id" hidden>ID</TableHeaderColumn>
            <TableHeaderColumn dataField="username">Юзернейм</TableHeaderColumn>
            <TableHeaderColumn dataField="profile" dataFormat={this.nameFormatter.bind(this, 'firstName')}>Имя</TableHeaderColumn>
            <TableHeaderColumn dataField="profile" dataFormat={this.nameFormatter.bind(this, 'lastName')}>Фамилия</TableHeaderColumn>
            <TableHeaderColumn dataField="profile" dataFormat={this.nameFormatter.bind(this, 'middleName')}>Отчество</TableHeaderColumn>
            <TableHeaderColumn dataField="createdAt" filterFormatted dataFormat={this.nameDate}>Зарегистрирован</TableHeaderColumn>
            <TableHeaderColumn dataField="updatedAt" filterFormatted dataFormat={this.nameDate}>Последнее изменение</TableHeaderColumn>
            <TableHeaderColumn dataField="visitedAt" filterFormatted dataFormat={this.nameDate}>Последнее посещение</TableHeaderColumn>
            <TableHeaderColumn dataField="_id" filterFormatted dataFormat={this.addButton}>Действие</TableHeaderColumn>
          </BootstrapTable>
        </CardBlock>
      </Card>
    );
  }
}
