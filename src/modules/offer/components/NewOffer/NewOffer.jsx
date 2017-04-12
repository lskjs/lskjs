import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { inject } from 'mobx-react';
import {
  Card,
  CardBlock,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import Form from 'lsk-general/General/Form';
import Component from 'lsk-general/General/Component';

@inject('log', 'api')
export default class NewOffer extends Component {
  static propTypes = {
    api: PropTypes.object.isRequired,
    log: PropTypes.object.isRequired,
  }
  @autobind
  async handleSubmit(body) {
    const { api, log } = this.props;
    const res = await api.fetch('/api/module/offer', { method: 'POST', body });
    if (res.message === 'ok') {
      log.info('res', res);
      this.redirect('/cabinet/offers');
    }
  }
  render() {
    const fields = [
      {
        name: 'title',
        title: 'Заголовок',
        control: {
          placeholder: 'Введите заголовок',
        },
      },
      {
        name: 'info.content',
        title: 'Описание',
        control: {
          placeholder: 'Опишите ваше предложение',
        },
      },
      {
        name: 'price',
        title: 'Цена',
        control: {
          type: 'number',
          min: 0,
        },
      },
      {
        name: 'term',
        title: 'Срок (в днях)',
        control: {
          type: 'number',
          min: 0,
        },
      },
    ];
    return (
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col xs={12} md={6}>
          <Card>
            <CardBlock>
              <Form
                fields={fields}
                onSubmit={this.handleSubmit}
                submitButton={(
                  <Button
                    type="submit"
                    bsStyle="primary"
                    style={{
                      position: 'relative',
                    }}
                  >
                    Создать новое предложение
                  </Button>
                )}
              />
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}
