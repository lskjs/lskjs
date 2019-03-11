import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Slides extends PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
