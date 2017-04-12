import React, { Component, PropTypes } from 'react';
import css from 'importcss';
import Male from 'react-icons2/fa/male';
import Female from 'react-icons2/fa/female';
import GenderGraph from '../GenderGraph';

@css(require('./GenderBlock.css'))
export default class GenderBlock extends Component {
  render() {
    const { sex, precent } = this.props;
    return (
      <div styleName="gender-block">
        <div styleName="gender-block-stat">
          {sex === 'male' && <Male />}
          {sex === 'female' && <Female />}
          <div>{`${precent}%`}</div>
        </div>
        <div styleName="gender-block-info">
          <GenderGraph name="13-17" value="22" />
          <GenderGraph name="18-24" value="26" />
          <GenderGraph name="25-34" value="24" />
          <GenderGraph name="35+" value="8" />
        </div>
      </div>
    );
  }
}
