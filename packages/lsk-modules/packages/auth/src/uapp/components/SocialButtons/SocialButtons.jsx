import React, { Component } from 'react';
import PropTypes from 'prop-types';
import importcss from 'importcss';
import { inject } from 'mobx-react';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import SocialButton from '../SocialButton';
import socials from '../../socials';

@inject('config')
export default class SocialButtons extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  }
  render() {
    const { config } = this.props;
    const providers = get(config, 'auth.providers', []);
    // console.log({providers});

    const buttons = map(providers || [], (provider) => {
      if (!socials[provider.type]) return null;
      return {
        ...socials[provider.type],
        ...provider,
      };
    }).filter(a => a);

    if (buttons.length === 0) return null;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {buttons.map((value, i) => (
          <SocialButton
            key={value.provider}
            name={value.type}
            clickable
            onClick={() => this.props.onClick(value.provider)}
            size={40}
            style={{ marginLeft: i ? 10 : 0 }}
          />
        ))}
      </div>
    );
  }
}
