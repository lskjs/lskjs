import React, { Component, PropTypes } from 'react';
import { Card, CardBlock, Button } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import Link from 'lsk-general/General/Link';
import VisibilitySensor from 'react-visibility-sensor';
import Loading from '~/App/components/Loading';
import keyBy from 'lodash/keyBy';

export default (ctx, module) => (

  @observer
  class Posts extends Component {
    static propTypes = {
      posts: PropTypes.object.isRequired,
    }

    constructor() {
      super();
      this.state = {
        users: {},
        categories: {},
      };
    }

    componentDidMount() {
      this.getUsers();
      this.getCategories();
    }

    username(cell, obj) {
      return obj.user.fullName;
    }

    date(cell) {
      return Date.toHumanString(cell);
    }

    addButton(data) {
      return (
        <Button
          componentClass={Link}
          bsSize="sm"
          href={`/cabinet/posts/${data}`}
        >
          Перейти
        </Button>
      );
    }

    convertToOptions(arr, params) {
      const obj = keyBy(arr, params.key);
      const options = {};
      for (const key in obj) {
        options[key] = obj[key][params.field];
      }
      return options;
    }

    @autobind
    async getCategories() {
      const arr = await module.stores.Posts.getCategories();
      const categories = this.convertToOptions(arr, {
        key: 'category',
        field: 'category',
      });
      this.setState({ categories });
    }

    @autobind
    async getUsers() {
      const arr = await ctx.stores.Users.getUsers();
      const users = this.convertToOptions(arr, {
        key: '_id',
        field: 'fullName',
      });
      this.setState({ users });
    }

    @autobind
    async handleMoreUsers(isVisible) {
      if (isVisible) {
        await this.props.posts.fetchPosts(20);
      }
    }

    @autobind
    async onSortChange(sortName, sortOrder) {
      await this.props.posts.sortPosts(sortName, sortOrder);
    }

    @autobind
    async onFilterChange(obj) {
      if (Object.keys(obj).length === 0) {
        await this.props.posts.clearFilters();
        return false;
      }
      const filters = {};
      for (const field in obj) {
        filters[field] = obj[field].value;
      }
      ctx.log.trace('filters', filters);
      await this.props.posts.filterPosts(filters);
      return true;
    }

    render() {
      const { posts } = this.props;
      const { users, categories } = this.state;
      return (
        <Card>
          <CardBlock>
            <Button componentClass={Link} href="/cabinet/posts/create">Создать пост</Button>
            <BootstrapTable
              hover
              remote
              bordered={false}
              data={posts.list}
              options={{
                onSortChange: this.onSortChange,
                onFilterChange: this.onFilterChange,
                noDataText: <p style={{ textAlign: 'center' }}>Результатов не найдено</p>,
              }}
              trClassName="centered-table"
            >
              <TableHeaderColumn
                isKey
                hidden
                dataField="_id"
              />
              <TableHeaderColumn
                filterFormatted
                dataField="user"
                dataFormat={this.username}
                filter={{
                  type: 'SelectFilter',
                  options: users,
                  placeholder: 'Поиск по пользователю',
                }}
              >
                Имя пользователя
              </TableHeaderColumn>
              <TableHeaderColumn
                filterFormatted
                dataField="content"
                filter={{
                  type: 'TextFilter',
                  placeholder: 'Поиск по контенту',
                }}
              >
                Контент
              </TableHeaderColumn>
              <TableHeaderColumn
                filterFormatted
                dataField="category"
                filter={{
                  type: 'SelectFilter',
                  options: categories,
                  placeholder: 'Поиск по категории',
                }}
              >
                Категория
              </TableHeaderColumn>
              <TableHeaderColumn
                filterFormatted
                dataSort
                dataField="createdAt"
                dataFormat={this.date}
              >
                Дата создания
              </TableHeaderColumn>
              <TableHeaderColumn
                filterFormatted
                dataSort
                dataField="updatedAt"
                dataFormat={this.date}
              >
                Дата обновления
              </TableHeaderColumn>
              <TableHeaderColumn
                filterFormatted
                dataField="_id"
                dataFormat={this.addButton}
              />
            </BootstrapTable>
            <VisibilitySensor
              onChange={this.handleMoreUsers}
              intervalCheck={false}
              scrollCheck
            />
            {/* @TODO: сделать кнопку загрузить пользователей */}
            <If condition={posts.loading}>
              <Loading text="Загрузка пользователей.." />
            </If>
          </CardBlock>
        </Card>
      );
    }

  }

);
