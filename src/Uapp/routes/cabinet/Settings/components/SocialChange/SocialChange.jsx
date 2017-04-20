import React, { PureComponent } from 'react';
import {
  Card,
  CardBlock,
} from 'react-bootstrap';
import css from 'importcss';

import Youtube from 'react-icons2/mdi/youtube-play';
import Vk from 'react-icons2/mdi/vk';

import SocialButton from './components/SocialButton';

@css(require('./SocialChange.css'))
export default class SocialChange extends PureComponent {
  render() {
    return (
      <Card>
        <CardBlock styleName="flex">
          <h4>Социальные сети</h4>
          <b>Подключённые</b>
          <div styleName="block">
            <SocialButton
              color="#e62117"
              icon={<Youtube />}
              active
            />
          </div>
          <b>Не подключённые</b>
          <div styleName="block">
            <SocialButton
              color="#507299"
              icon={<Vk />}
              tooltip="Подключить ВКонтакте"
            />
          </div>
        </CardBlock>
      </Card>
    );
  }
}
