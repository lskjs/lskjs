import React, { PropTypes } from 'react';
import { inject, observer } from 'mobx-react';
import { autobind } from 'core-decorators';
import { Row, Col, Button } from 'react-bootstrap';
import { Card, CardBlock } from 'reactstrap';

import Loading from 'react-icons/lib/md/refresh';
import Error from 'react-icons/lib/md/clear';
import Check from 'react-icons/lib/md/check';
import Component from 'lsk-general/General/Component';
import Form from 'lsk-general/General/Form';

@inject('user')
@observer
export default class ProfilePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  changeField(field) {
    return (e) => {
      this.props.user.editField(field, e.target.value);
    };
  }
  @autobind
  async handleSubmit(data) {
    await this.props.user.editUser(data);
    this.redirect('/cabinet');
  }
  render() {
    const user = this.props.user;
    const status = null;
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
                    control: {
                      placeholder: 'Например, utkin@mail.ru',
                      value: user.username,
                      onChange: this.changeField('username'),
                    },
                  },
                  {
                    name: 'name',
                    title: 'Имя',
                    control: {
                      placeholder: 'Например, Василий',
                      value: user.name,
                      onChange: this.changeField('name'),
                    },
                  },
                  {
                    name: 'surname',
                    title: 'Фамилия',
                    control: {
                      placeholder: 'Например, Пушкин',
                      value: user.surname,
                      onChange: this.changeField('surname'),
                    },
                  },
                  {
                    name: 'middlename',
                    title: 'Отчество',
                    control: {
                      placeholder: 'Например, Александрович',
                      value: user.middlename,
                      onChange: this.changeField('middlename'),
                    },
                  },
                  {
                    name: 'info.phone',
                    title: 'Телефон',
                    control: {
                      placeholder: 'Например, 927000000',
                      value: user.info.phone,
                      onChange: this.changeField('info.phone'),
                    },
                  },
                  {
                    name: 'info.company',
                    title: 'Компания',
                    control: {
                      placeholder: 'Например, Компания',
                      value: user.info.company,
                      onChange: this.changeField('info.company'),
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
                    {/* <If condition={!status}> */}
                    <span style={{ visibility: !status ? 'visible' : 'hidden' }}>
                      Сохранить
                    </span>
                    {/* <div styleName="button-icon-status spin"><Loading /></div> */}
                    <If condition={status}>
                      <div styleName="button-icon-status">
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
