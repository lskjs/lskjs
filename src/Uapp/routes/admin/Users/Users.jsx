import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Box from 'lsk-admin/Admin/lib/widgets/Box';

export default class Users extends Component {
  render() {
    const products = [
      {
        id: 1,
        name: 'Василий',
        email: 'vasya@demo.online',
        date: new Date(),
      },
      {
        id: 2,
        name: 'Василий',
        email: 'vasya@demo.online',
        date: new Date(),
      },
      {
        id: 3,
        name: 'Василий',
        email: 'vasya@demo.online',
        date: new Date(),
      },
      {
        id: 4,
        name: 'Василий',
        email: 'vasya@demo.online',
        date: new Date(),
      },
      {
        id: 5,
        name: 'Василий',
        email: 'vasya@demo.online',
        date: new Date(),
      },
      {
        id: 6,
        name: 'Василий',
        email: 'vasya@demo.online',
        date: new Date(),
      },
    ];
    return (
      <Row>
        <Col xs={12}>
          <Box title="Пользователи">
            <BootstrapTable data={products} striped>
              <TableHeaderColumn dataField="id" isKey dataSort>ID</TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort>Имя</TableHeaderColumn>
              <TableHeaderColumn dataField="email" dataSort>Электронная почта</TableHeaderColumn>
              <TableHeaderColumn dataField="date" dataSort>Дата регистрации</TableHeaderColumn>
            </BootstrapTable>
          </Box>
        </Col>
      </Row>
    );
  }
}
