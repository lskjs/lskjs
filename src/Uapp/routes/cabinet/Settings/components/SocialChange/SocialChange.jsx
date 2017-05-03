import React, { PureComponent, PropTypes } from 'react';
import {
  Card,
  CardBlock,
} from 'react-bootstrap';
import css from 'importcss';
import { observer, inject } from 'mobx-react';
import { autobind } from 'core-decorators';

import { buttons as socials } from '~/modules/auth/components/AuthPage/SocialButtons';
import SocialButton from './components/SocialButton';

@inject('config', 'log')
@observer
@css(require('./SocialChange.css'))
export default class SocialChange extends PureComponent {
  static propTypes = {
    passports: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    log: PropTypes.object.isRequired,
  };
  @autobind
  bind(provider) {
    // this.props.log.info('Пока не работает!', provider);
    window.location = `/api/module/auth/${provider}`;
  }
  @autobind
  unbind(provider) {
    this.props.passports.disconnectSocial(provider);
  }
  convertToComponent(social = {}, provider, active = false) {
    const data = { ...social };
    data.key = provider;
    data.active = active;
    data.tooltip = active
      ? `Отключить ${social.title}`
      : `Подключить ${social.title}`;

    data.onClick = active
      ? () => this.unbind(provider)
      : () => this.bind(provider);

    return <SocialButton {...data} />;
  }
  render() {
    const { config, passports } = this.props;
    const connected = passports.list.map(i => i.provider);
    const available = config.auth.socials.filter(i => !connected.includes(i));
    return (
      <Card>
        <CardBlock styleName="flex">
          <h4>Социальные сети</h4>
          {connected.length > 0 && (
            <div>
              <b>Подключённые</b>
              <div styleName="block">
                {connected.map(p => this.convertToComponent(socials[p], p, true))}
              </div>
            </div>
          )}
          {available.length > 0 && (
            <div>
              <b>Не подключённые</b>
              <div styleName="block">
                {available.map(p => this.convertToComponent(socials[p], p))}
              </div>
            </div>
          )}
        </CardBlock>
      </Card>
    );
  }
}
