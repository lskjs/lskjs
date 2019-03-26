import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './IconButton.styles';

class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    htmlType: PropTypes.string,
  }
  static defaultProps = {
    htmlType: 'button',
  }
  render() {
    const { icon, htmlType, ...props } = this.props;
    return (
      <Button
        htmlType={htmlType}
        type="dashed"
        shape="circle"
        icon={icon}
        {...props}
      />
    );
  }
}

export default IconButton;
