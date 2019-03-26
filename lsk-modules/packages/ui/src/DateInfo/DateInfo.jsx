import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import If from 'react-if';


@inject('i18')
@observer
class DateInfo extends Component {
  render() {
    const {
      i18,
      value,
      time,
      format = 'l',
      longFormat = 'LLL',
    } = this.props;
    if (!value) return null;
    return (
      <span title={i18.m(value).format(longFormat)}>
        {i18.m(value).format(format)}
        <If condition={time}>
          <div>
            {i18.m(value).format('LTS')}
          </div>
        </If>
      </span>
    );
  }
}

export default DateInfo;
