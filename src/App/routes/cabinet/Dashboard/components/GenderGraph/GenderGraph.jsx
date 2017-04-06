import React, { Component, PropTypes } from 'react';
import css from 'importcss';


@css(require('./GenderGraph.css'))
export default class GenderGraph extends Component {
  render() {
    const { name, value } = this.props;
    return (
      <div styleName="gender-graph">
        <span>{name}</span>
        <div styleName="progressbar-wrapper">
          <div styleName="progressbar-container">
            <div
              styleName="progressbar-progress"
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      </div>
    );
  }
}
