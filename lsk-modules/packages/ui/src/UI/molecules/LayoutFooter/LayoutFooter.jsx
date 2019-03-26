import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LayoutFooterWrapper from '../../atoms/LayoutFooterWrapper';
import LayoutFooterInner from '../../atoms/LayoutFooterInner';

class LayoutFooter extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }
  render() {
    const { children, ...props } = this.props;
    return (
      <LayoutFooterWrapper {...props}>
        <LayoutFooterInner>
          {children}
        </LayoutFooterInner>
      </LayoutFooterWrapper>
    );
  }
}

export default LayoutFooter;
