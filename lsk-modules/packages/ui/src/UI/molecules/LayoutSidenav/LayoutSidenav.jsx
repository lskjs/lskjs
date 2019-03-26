import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sider from './LayoutSidenav.styles';

class LayoutSidenav extends Component {
  static propTypes = {
    collapsed: PropTypes.bool,
    hidden: PropTypes.bool,
    width: PropTypes.number,
    mobile: PropTypes.bool,
    children: PropTypes.any.isRequired,
  }
  static defaultProps = {
    width: 240,
    collapsed: false,
    hidden: false,
    mobile: false,
  }
  render() {
    const {
      collapsed,
      hidden,
      width,
      mobile,
      children,
    } = this.props;
    const collapsedWidth = hidden ? 0 : 80;
    let siderProps = {};
    if (!mobile) {
      siderProps = {
        collapsible: true,
        collapsed: (collapsed || hidden),
        collapsedWidth,
      };
    }
    return (
      <Sider
        trigger={null}
        width={width}
        {...siderProps}
      >
        {children}
      </Sider>
    );
  }
}

export default LayoutSidenav;
