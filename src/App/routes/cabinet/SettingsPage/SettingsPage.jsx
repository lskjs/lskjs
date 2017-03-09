import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { Row, Col, Button } from 'react-bootstrap';
import { Card, CardBlock } from 'reactstrap';
import cx from 'classnames';

import Loading from 'react-icons/lib/md/refresh';
import Error from 'react-icons/lib/md/clear';
import Check from 'react-icons/lib/md/check';
import Component from 'lsk-general/General/Component';
import Form from 'lsk-general/General/Form';

@inject('user', 'ui') @observer
export default class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
  }
  @autobind
  async handleSubmit(data) {
    await this.props.user.editUser(data);
    // this.redirect('/cabinet');
  }
  render() {
    const { user, ui } = this.props;
    const status = ui.statusRequest;
    return (
      <Row>
        <Col md={6} xs={12}>
          <Card style={{ margin: '20px 0' }}>
            <CardBlock>
              <h4>Редактирование</h4>
              <Form
                fields={[
                  {
                    name: 'username',
                    title: 'Почта',
                    value: user.username,
                    control: {
                      placeholder: 'Например, utkin@mail.ru',
                    },
                  },
                  {
                    name: 'name',
                    title: 'Имя',
                    value: user.name,
                    control: {
                      placeholder: 'Например, Василий',
                    },
                  },
                  {
                    name: 'surname',
                    title: 'Фамилия',
                    value: user.surname,
                    control: {
                      placeholder: 'Например, Пушкин',
                    },
                  },
                  {
                    name: 'middlename',
                    title: 'Отчество',
                    value: user.middlename,
                    control: {
                      placeholder: 'Например, Александрович',
                    },
                  },
                  {
                    name: 'info.phone',
                    title: 'Телефон',
                    value: user.info.phone,
                    control: {
                      placeholder: 'Например, 927000000',
                    },
                  },
                  {
                    name: 'info.company',
                    title: 'Компания',
                    value: user.info.company,
                    control: {
                      placeholder: 'Например, Компания',
                    },
                  },
                ]}
                onSubmit={this.handleSubmit}
                // onError={this.handleSubmit}
                submitButton={(
                  <Button
                    type="submit"
                    bsStyle="primary"
                    disabled={!!status}
                    style={{
                      position: 'relative',
                    }}
                  >
                    <span style={{ display: !status ? 'block' : 'none' }}>
                      Сохранить
                    </span>
                    <If condition={status}>
                      <div
                        className={cx({
                          'button-icon-status': true,
                          spin: status === 'wait',
                        })}
                      >
                        <If condition={status === 'wait'}>
                          <Loading />
                        </If>
                        <If condition={status === 'ok'}>
                          <Check />
                        </If>
                        <If condition={status === 'error'}>
                          <Error />
                        </If>
                      </div>
                    </If>
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
