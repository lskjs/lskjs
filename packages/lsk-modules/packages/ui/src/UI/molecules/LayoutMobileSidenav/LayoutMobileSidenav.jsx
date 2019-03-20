import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LayoutSidenav from '../LayoutSidenav';
import Drawer from './LayoutMobileSidenav.styles';

class LayoutMobileSidenav extends Component {
  static propTypes = {
    mobileHidden: PropTypes.bool,
    onCloseMobile: PropTypes.func,
    width: PropTypes.number,
  }
  static defaultProps = {
    mobileHidden: true,
    onCloseMobile: null,
    width: 240,
  }
  render() {
    const {
      mobileHidden,
      onCloseMobile,
      width,
      ...props
    } = this.props;
    return (
      <Drawer
        closable={false}
        visible={!mobileHidden}
        placement="left"
        className="d-md-none app-drawer"
        width={width}
        onClose={onCloseMobile}
      >
        <LayoutSidenav
          width={width}
          {...props}
        />
      </Drawer>
    );
  }
}

export default LayoutMobileSidenav;
