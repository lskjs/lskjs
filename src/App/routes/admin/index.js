import getData from './getData';
import { Grid, Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button as Button2 } from 'react-bootstrap';
import AdminLayout from './AdminLayout'

import { Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';


export default {
  async action({ app, ctx, next }) {
    const data = await getData(ctx, app);
    const categories = _.keyBy(data.categories, 'categoryId')
    console.log('data', data);
    const games = data.games.map(game => {
      const fullname = ['lastname', 'firstname', 'middlename'].map(k => game.cert && game.cert[k]).filter(k => k).join(' ')
      return {
        id: game._id,
        fullname,
        category: categories[game.categoryId] && categories[game.categoryId].title,
        result: game.result && (Math.round(game.result.score * 100) + '%'),
        correct: game.result && (game.result.correct + '/' + game.result.count),
      }
    })

    const children = (
      <AdminLayout>
          <h1>Игры пользователей</h1>
          <BootstrapTable data={games} striped hover>
            <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
            <TableHeaderColumn dataField="fullname">Пользователь</TableHeaderColumn>
            <TableHeaderColumn dataField="category">Категория</TableHeaderColumn>
            <TableHeaderColumn dataField="result">result</TableHeaderColumn>
            <TableHeaderColumn dataField="correct">correct</TableHeaderColumn>
          </BootstrapTable>
      </AdminLayout>
    );

    // const res = {
    //   _type: 'response',
    //   layout: AdminLayout,
    //   children,
    //   component: children,
    // }

    return {
      component: <AdminLayout>
          <Row>
            <Col md={4}>
              <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBlock>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  <Button2>Button2</Button2>
                </CardBlock>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBlock>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  <Button2>Button2</Button2>
                  <Button>Button</Button>
                </CardBlock>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                <CardBlock>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  <Button>Button</Button>
                </CardBlock>
              </Card>
            </Col>
          </Row>

          <h1>Игры пользователей</h1>
          <BootstrapTable data={games} striped hover>
            <TableHeaderColumn isKey dataField="id">ID</TableHeaderColumn>
            <TableHeaderColumn dataField="fullname">Пользователь</TableHeaderColumn>
            <TableHeaderColumn dataField="category">Категория</TableHeaderColumn>
            <TableHeaderColumn dataField="result">result</TableHeaderColumn>
            <TableHeaderColumn dataField="correct">correct</TableHeaderColumn>
          </BootstrapTable>
      </AdminLayout>,
    };
  },
};
