import React, { Component, PropTypes } from 'react';
import { Card, CardBlock, Button } from 'react-bootstrap';
import { autobind } from 'core-decorators';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { observer } from 'mobx-react';
import Link from 'lsk-general/General/Link';
import VisibilitySensor from 'react-visibility-sensor';
import Loading from '~/App/components/Loading';

export default ctx => (

  @observer
  class Posts extends Component {
    static propTypes = {
      posts: PropTypes.object.isRequired,
    }

    constructor() {
      super();
      this.state = {
        loading: false,
      };
    }

    username(cell) {
      return cell.fullName;
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

    @autobind
    async handleMoreUsers(isVisible) {
      if (isVisible) {
        this.setState({ loading: true });
        await this.props.posts.fetchPosts(20);
        this.setState({ loading: false });
      }
    }

    render() {
      const { loading } = this.state;
      const { posts } = this.props;
      return (
        <Card>
          <CardBlock>
            <Button componentClass={Link} href="/cabinet/posts/create">Создать пост</Button>
            <BootstrapTable
              hover
              bordered={false}
              data={posts.list}
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
                  type: 'TextFilter',
                  delay: 0,
                  placeholder: 'Поиск по Юзернейму',
                }}
              >
                Имя пользователя
              </TableHeaderColumn>
              <TableHeaderColumn
                filterFormatted
                dataField="content"
              >
                Контент
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

);
