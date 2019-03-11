import React, { PureComponent } from 'react';
import If from 'react-if';
import PropTypes from 'prop-types';
import CTACentered from '../CTACentered';

import {
  ImageWrapper,
  Wrapper,
} from './ErrorComponent.styles';

class ErrorComponent extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.any,
    footer: PropTypes.string,
    image: PropTypes.any,
    align: PropTypes.string,
  };
  static defaultProps = {
    title: null,
    subtitle: null,
    actions: null,
    footer: null,
    image: null,
    align: 'left',
  };
  render() {
    const {
      image,
      title,
      subtitle,
      actions,
      footer,
      align,
      ...props
    } = this.props;
    return (
      <Wrapper {...props}>
        <If condition={image}>
          <ImageWrapper>
            {image}
          </ImageWrapper>
        </If>
        <CTACentered
          title={title}
          subtitle={subtitle}
          actions={actions}
          footer={footer}
          align={align}
        />
      </Wrapper>
    );
  }
}
export default ErrorComponent;
