import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Block from './Title.styles';

class Title extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    componentClass: PropTypes.any,
  }
  static defaultProps = {
    children: null,
    componentClass: 'h4',
  }
  render() {
    const { children, componentClass: Tag, ...props } = this.props;
    return (
      <Block componentClass={Tag} {...(Tag !== 'h4' ? props : {})}>
        {children}
      </Block>
    );
  }
}

export default Title;
