import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';
import {
  Button,
} from 'react-bootstrap';

import VKontakte from 'react-icons2/fa/vk';
import Odnoklassniki from 'react-icons2/fa/odnoklassniki';
import Facebook from 'react-icons2/fa/facebook';
import Twitter from 'react-icons2/fa/twitter';
import Twitch from 'react-icons2/fa/twitch';
import Youtube from 'react-icons2/fa/youtube-play';
import Instagram from 'react-icons2/fa/instagram';

import _ from 'lodash';

export const buttons = {
  vkontakte: {
    title: 'ВКонтакте',
    icon: <VKontakte />,
    color: '#fff000',
  },
  odnoklassniki: {
    icon: <Odnoklassniki />,
  },
  facebook: {
    icon: <Facebook />,
  },
  twitter: {
    icon: <Twitter />,
  },
  twitch: {
    icon: <Twitch />,
  },
  youtube: {
    icon: <Youtube />,
  },
  instagram: {
    icon: <Instagram />,
  },
};

@importcss(require('./AuthPage.css'))
export class SocialButton extends Component {
  render() {
    const { name } = this.props;
    const value = buttons[name];
    return (
      <Button
        {...this.props}
        styleName={`btn-social is-${name}`}
      >
        {value.icon}
      </Button>
    );
  }
}

@importcss(require('./AuthPage.css'))
export default class SocialButtons extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }
  render() {
    const { auth, config } = this.props;
    const socials = _.get(config, 'auth.socials', []);
    const buttons2 = _.map(buttons, (value, name) => {
      if (socials.indexOf(name) === -1) return null;
      return { name, ...value };
    }).filter(a => a);

    if (buttons2.length == 0) return null;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {buttons2.map(value => (
          <SocialButton
            key={value.name}
            name={value.name}
            onClick={() => auth.authPassport(value.name)}
          />
        ))}
      </div>
    );
  }
}
