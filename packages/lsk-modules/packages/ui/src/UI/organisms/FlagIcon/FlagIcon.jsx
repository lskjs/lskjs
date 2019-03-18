import React, { Component } from 'react';
// import { observer } from 'mobx-react';
import keyBy from 'lodash/keyBy';
// import Tooltip from '~/Uapp/components/Tooltip';
import countries from './countries.json';

const codes = keyBy(countries, 'code');

// @inject('t')
// @observer
class FlagIcon extends Component {
  static codes = codes;
  static getInfo(inputCode) {
    if (typeof inputCode !== 'string') {
      inputCode = 'zz';
    }
    const code = inputCode.trim().toLowerCase();
    // console.log('this.codes', this.codes, codes);
    let info = /* this. */codes[code];
    if (!info) {
      info = /* this. */codes.zz;
    }
    info.code = code;
    if (code === 'zz') {
      info.flag = require('./pirate-icon.svg');
    }
    return {
      code,
      ...info,
    };
  }
  render() {
    const {
      code, t = () => '', key, tooltip = false, ...props
    } = this.props;
    const country = this.constructor.getInfo(code);
    let { flag } = country;
    if (!flag) {
      flag = `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/flags/4x3/${country.code}.svg`;
    }

    const content = (
      <img
        style={{
          height: '16px',
          border: '1px solid #e3e3e3',
        }}
        src={flag}
        alt={t(`country.${country.code}`)}
        {...props}
      />
    );

    if (!tooltip) return content;
    return false;
    // if (__DEV__) {
    //   return (
    //     <Tooltip noStyle id={`country.${country.code}`} overlay={t(`country.${country.code}`)} key={country.code}>
    //       {content}
    //     </Tooltip>
    //   );
    // }
    // }
    // return (
    //   <img
    //     src={flag}
    //     alt={t(`country.${country.code}`)}
    //     {...props}
    //   />
    // );
  }
}

export default FlagIcon;
