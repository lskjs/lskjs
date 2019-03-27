import React from 'react';
import PropTypes from 'prop-types';
import autobind from '@lskjs/autobind';
import { observer, inject } from 'mobx-react';
import {
  Grid,
  Row,
  Col,
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import {
  Card,
  CardBlock,
  CardFooter,
  CardTitle,
  CardText,
} from 'react-bootstrap-card';
import Error from 'react-icons2/md/clear';
import Check from 'react-icons2/md/check';

import Component from '@lskjs/general/Component';
import Link from '@lskjs/general/Link';
import Avatar from '@lskjs/general/Avatar';

import buttons from '../../socials';
import Slide from '../AuthPage/Slide';

@inject(stores => ({
  Passports: stores.uapp.modules.auth.stores.Passports,
}))
@observer
export default class AuthPage extends Component {
  static defaultProps = {
    passport: {},
  };
  static propTypes = {
    passport: PropTypes.object,
    Passports: PropTypes.any.isRequired,
  };
  @autobind
  async handleSubmit() {
    const { query, Passports } = this.props;
    // console.log('passports', passports);
    await Passports.bindSocial(query).then(() => {
      this.redirect('/cabinet/settings');
      global.toast && global.toast({
        type: 'success',
        title: 'Социальная сеть подключена',
      });
    });
  }
  render() {
    const { passport } = this.props;
    return (
      <Slide>
        <Grid>
          <Row>
            <Col md={4} mdOffset={4}>
              <Card>
                <CardBlock>
                  <CardTitle>
                    {`Подключить ${buttons[passport.provider].title}?`}
                  </CardTitle>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <Avatar
                      src={passport.profile.avatar}
                    />
                  </div>
                  <ButtonGroup style={{ width: '100%' }}>
                    <Button style={{ width: '50%' }} bsStyle="success" onClick={this.handleSubmit}><Check /> Подключить</Button>
                    <Button style={{ width: '50%' }} bsStyle="danger" componentClass={Link} href="/cabinet/settings"><Error /> Не подключать</Button>
                  </ButtonGroup>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </Grid>
      </Slide>
    );
  }
}
