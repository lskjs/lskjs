import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// import ReactTooltip from 'react-tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import BsTooltip from 'react-bootstrap/lib/Tooltip';
import Block from './Tooltip.styles';
import filterProps from '../utils/filterProps';

function makeId() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

class Tooltip extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    overlay: PropTypes.any,
    componentClass: PropTypes.any,
    children: PropTypes.any.isRequired,
    place: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
    disabled: PropTypes.bool,
    effect: PropTypes.oneOf(['solid', 'float']),
  }
  static defaultProps = {
    place: 'bottom',
    overlay: 'Simple Tooltip',
    componentClass: 'span',
    disabled: false,
    id: makeId(),
    effect: 'solid',
  }
  render() {
    const {
      className,
      noStyle,
      effect,
      disabled,
      componentClass,
      id,
      overlay,
      place,
      children,
      ...props
    } = this.props;
    const Tag = componentClass || 'span';
    if (disabled) {
      return (
        <Block
          disabled={disabled}
          componentClass={Tag}
          // {...(componentClass ? props : {})}
          {...filterProps(componentClass ? props : {}, Tag)}
        >
          {children}
        </Block>
      );
    }
    const overlayTooltip = (
      <BsTooltip
        id={id}
        bsClass={cx({
          'buzz-tooltip-component': typeof overlay !== 'string',
          tooltip: true,
        })}
      >
        {overlay}
      </BsTooltip>
    );
    return (
      <OverlayTrigger
        placement={place}
        overlay={overlayTooltip}
        delayShow={600}
      >
        <Block
          disabled={disabled}
          componentClass={Tag}
          className="tooltip-block"
          // {...(componentClass ? props : {})}
          {...filterProps(componentClass ? props : {}, Tag)}
        >
          {children}
        </Block>
      </OverlayTrigger>
    );
    // return (
    //   <div className={styleName(styles, cx({
    //     wrapper: true,
    //     noStyle,
    //     [stName]: stName,
    //   }), className)}
    //   >
    //     <Tag
    //       data-tip
    //       data-for={id}
    //       className={styleName(styles, cx({
    //       block: trzue,
    //       noStyle,
    //     }), className)}
    //       {...(componentClass ? props : {})}
    //     >
    //       {children}
    //     </Tag>
    //     <ReactTooltip
    //       effect={effect}
    //       id={id}
    //       place={place}
    //       delayShow={600}
    //       className={cx({
    //         'buzz-tooltip': true,
    //         'buzz-tooltip-text': typeof overlay === 'string',
    //       })}
    //     >
    //       {overlay}
    //     </ReactTooltip>
    //   </div>
    // );
  }
}

export default Tooltip;
