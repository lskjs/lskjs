import React, { Component, PropTypes } from 'react';
import { Card, CardBlock, Button } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import Link from 'lsk-general/General/Link';
import moment from 'moment';
import VisibilitySensor from 'react-visibility-sensor';
import Loading from '~/App/components/Loading';

@observer
export default class Users extends Component {

  static propTypes = {
    users: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  nameFormatter(data) {
    return data || '';
  }

  nameDate(data) {
    return moment(data).locale('ru').format('LL');
  }

  addButton(data) {
    return (
      <Button
        componentClass={Link}
        bsSize="sm"
        href={`/cabinet/user/${data}`}
      >
        Перейти
      </Button>
    );
  }

  avatarFormatter(data) {
    return (
      `<img
        width="40"
        height="40"
        src="${data}"
        style="border-radius: 50%"
      />`
    );
  }

  @autobind
  async handleMoreUsers(isVisible) {
    if (isVisible) {
      this.setState({ loading: true });
      await this.props.users.fetchUsers(5);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { users } = this.props;
    return (
      <Card>
        <CardBlock>
          <BootstrapTable
            hover
            bordered={false}
            data={users.list}
            trClassName="centered-table"
          >
            <TableHeaderColumn
              isKey
              hidden
              dataField="_id"
            />
            <TableHeaderColumn
              filterFormatted
              dataField="avatar"
              dataFormat={this.avatarFormatter}
            />
            <TableHeaderColumn
              dataField="username"
              filter={{
                type: 'TextFilter',
                delay: 0,
                placeholder: 'Поиск по Юзернейму',
              }}
            >
              Юзернейм
            </TableHeaderColumn>
            <TableHeaderColumn
              filterFormatted
              dataField="fullName"
              dataFormat={this.nameFormatter}
            >
              ФИО
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort
              filterFormatted
              dataField="createdAt"
              dataFormat={this.nameDate}
            >
              Регистрация
            </TableHeaderColumn>
            <TableHeaderColumn
              dataSort
              filterFormatted
              dataField="visitedAt"
              dataFormat={this.nameDate}
            >
              Посещение
            </TableHeaderColumn>
            <TableHeaderColumn
              filterFormatted
              dataField="_id"
              dataFormat={this.addButton}
            />
          </BootstrapTable>
          <VisibilitySensor
            onChange={this.handleMoreUsers}
            // intervalCheck={false}
            scrollCheck
          />
          {/* @TODO: сделать кнопку загрузить пользователей */}
          <If condition={loading}>
            <Loading text="Загрузка пользователей.." />
          </If>
        </CardBlock>
      </Card>
    );
  }
}
