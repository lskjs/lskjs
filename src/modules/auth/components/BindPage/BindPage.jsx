import React, { PropTypes } from 'react';
import { autobind } from 'core-decorators';
import { inject, observer } from 'mobx-react';
import {
  Card,
  CardBlock,
  CardTitle,
  Grid,
  Row,
  Col,
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import Error from 'react-icons2/md/clear';
import Check from 'react-icons2/md/check';

import Component from 'lsk-general/General/Component';
import Slide from './Slide';
import Link from 'lsk-general/General/Link';

import { buttons } from './SocialButtons';

@inject(stores => ({
  passports: stores.uapp.modules.passport.stores.Passports,
}))
@observer
export default class AuthPage extends Component {
  static defaultProps = {
    passport: {},
  };
  static propTypes = {
    passport: PropTypes.object,
    passports: PropTypes.object.isRequired,
  };
  @autobind
  async handleSubmit() {
    const { query, passports } = this.props;
    await passports.connectSocial(query.p).then(() => {
      this.redirect('/cabient/settings');
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
                  <div style={{ textAlign: 'center' }}>
                    <img src={passport.profile.avatar} style={{ borderRadius: '50%' }} />
                  </div>
                  <ButtonGroup justified>
                    <Button bsStyle="success" onClick={this.handleSubmit}><Check /> Подключить</Button>
                    <Button bsStyle="danger" componentClass={Link} href="/cabient/settings"><Error /> Не подключать</Button>
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
