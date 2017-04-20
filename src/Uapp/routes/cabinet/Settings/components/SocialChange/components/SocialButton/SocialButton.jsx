import React, { PureComponent, PropTypes } from 'react';
import css from 'importcss';
import cx from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Link from 'lsk-general/General/Link';

import Default from 'react-icons2/mdi/instagram';
import Plus from 'react-icons2/mdi/plus';
import Close from 'react-icons2/mdi/close';

import { hexToRgb } from '~/utils';

@css(require('./SocialButton.css'))
export default class SocialButton extends PureComponent {
  static defaultProps = {
    icon: <Default />,
    color: '#262626',
    active: false,
    style: 'default',
    styleName: null,
    tooltip: null,
  }
  static propTypes = {
    icon: PropTypes.node,
    color: PropTypes.string,
    active: PropTypes.bool,
    style: PropTypes.oneOf(['default', 'inverse']),
    styleName: PropTypes.string,
    tooltip: PropTypes.string,
  }
  renderOverlay() {
    const { active } = this.props;
    return (
      <div styleName="overlay">
        {active ? <Close /> : <Plus />}
      </div>
    );
  }
  renderButton() {
    const { icon, color, style, styleName } = this.props;
    const wStyle = {
      border: `2px solid rgba(${hexToRgb(color).r},${hexToRgb(color).g},${hexToRgb(color).b}, 0.4)`
    };
    const bStyle = {
      backgroundColor: color,
    };
    return (
      <div styleName="wrapper" style={wStyle}>
        <Link
          {...this.props}
          style={bStyle}
          styleName={cx({
            btn: true,
            [style]: true,
            [styleName]: styleName,
          })}
        >
          <span>{icon}</span>
          {this.renderOverlay()}
        </Link>
      </div>
    );
  }
  render() {
    const { tooltip } = this.props;
    if (tooltip) {
      const owTooltip = <Tooltip>{tooltip}</Tooltip>;
      return (
        <OverlayTrigger placement="top" overlay={owTooltip}>
          {this.renderButton()}
        </OverlayTrigger>
      );
    }
    return this.renderButton();
  }
}
