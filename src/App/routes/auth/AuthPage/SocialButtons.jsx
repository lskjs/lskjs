import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';
import {
  Button,
} from 'react-bootstrap';

import VKontakte from 'react-icons/lib/fa/vk';
import Odnoklassniki from 'react-icons/lib/fa/odnoklassniki';
import Facebook from 'react-icons/lib/fa/facebook';
import Twitter from 'react-icons/lib/fa/twitter';
import Twitch from 'react-icons/lib/fa/twitch';
import Youtube from 'react-icons/lib/fa/youtube-play';
import Instagram from 'react-icons/lib/fa/instagram';

import _ from 'lodash';

const passportButtons = {
  vkontakte: {
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
export default class SocialButtons extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
  }
  render() {
    const { auth, config } = this.props;
    const socials = _.get(config, 'auth.socials', []);
    const buttons = _.map(passportButtons, (value, name) => {
      if (socials.indexOf(name) === -1) return null;
      return { name, ...value };
    }).filter(a => a);

    if (buttons.length == 0) return null;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {buttons.map(value => (
          <Button
            key={value.name}
            styleName={`btn-social is-${value.name}`}
            onClick={() => auth.authPassport(value.name)}
          >
            {value.icon}
          </Button>
        ))}
      </div>
    );
  }
}
