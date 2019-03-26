import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slide from '../../../Slide';
import CoverTitle from '../../atoms/CoverTitle';
import CoverSubtitle from '../../atoms/CoverSubtitle';
import CoverDivider from '../../atoms/CoverDivider';
import CoverFooter from '../../atoms/CoverFooter';
import CoverButton from '../../atoms/CoverButton';
import CoverItem from './Cover.styles';

class Cover extends PureComponent {
  static Title = CoverTitle;
  static SubTitle = CoverSubtitle;
  static Divider = CoverDivider;
  static Footer = CoverFooter;
  static Button = CoverButton;
  static propTypes = {
    children: PropTypes.any,
    align: PropTypes.string,
    color: PropTypes.string,
  };
  static defaultProps = {
    children: null,
    align: 'left',
    color: 'black',
  };
  render() {
    let { align } = this.props;
    const {
      children,
      color,
      ...props
    } = this.props;
    const contentProps = {};
    if (align === 'center') {
      align = 'content';
      contentProps.center = true;
    }
    contentProps[align] = children;
    return (
      <CoverItem color={color}>
        <Slide
          {...props}
          {...contentProps}
        />
      </CoverItem>
    );
  }
}
export default Cover;
