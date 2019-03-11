import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { withTheme } from 'emotion-theming';
import { Scrollbars } from 'react-custom-scrollbars';
import cx from 'classnames';

@withTheme
class ModalScroll extends PureComponent {
  static propTypes = {
    maxHeight: PropTypes.number,
    minHeight: PropTypes.number,
    theme: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
    inner: PropTypes.bool,
    className: PropTypes.string,
  }
  static defaultProps = {
    minHeight: 0,
    maxHeight: 510,
    inner: false,
    className: null,
  }
  constructor(props) {
    super(props);
    this.state = {
      top: false,
      bottom: props.inner,
    };
    this.handleChangeBorder = this.handleChangeBorder.bind(this);
  }
  handleChangeBorder(event) {
    const state = {
      top: true,
      bottom: true,
    };
    if (event.top === 0) {
      state.top = false;
      state.bottom = true;
    } else if (event.top === 1) {
      state.top = true;
      state.bottom = false;
    }
    if (this.state.top !== state.top || this.state.bottom !== state.bottom) {
      this.setState(state);
    }
  }
  render() {
    const { top, bottom } = this.state;
    const {
      theme, children, maxHeight, minHeight, inner, className,
    } = this.props;
    const style = inner ? css`
      ${top && css`border-top: 1px solid ${theme.colors.border};`}
      ${bottom && css`border-bottom: 1px solid ${theme.colors.border};`}
    ` : null;
    return (
      <Scrollbars
        autoHide
        autoHeight
        autoHeightMin={minHeight}
        autoHeightMax={maxHeight}
        universal
        onScrollFrame={inner ? this.handleChangeBorder : null}
        className={cx([style, 'modal-scroll-content', className])}
      >
        {children}
      </Scrollbars>
    );
  }
}

export default ModalScroll;
