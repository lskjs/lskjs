import React, { PureComponent } from 'react';
import If from 'react-if';
import PropTypes from 'prop-types';
import Image from '../Image';
import {
  ACard,
  Info,
  InfoMask,
  InfoContent,
  InfoInner,
  Block,
} from './AnimatedCard.styles';

class AnimatedCard extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    paint: PropTypes.string,
    src: PropTypes.string,
    variant: PropTypes.oneOf([
      'circle',
      'top',
      'bottom',
    ]),
  }
  static defaultProps = {
    children: null,
    paint: null,
    src: null,
    variant: 'circle',
  }
  render() {
    const {
      children,
      src,
      paint,
      variant,
    } = this.props;
    return (
      <ACard variant={variant}>
        <Image
          width="100%"
          src={src}
        />
        <If condition={variant === 'circle'}>
          <Info>
            <InfoMask paint={paint} />
            <InfoContent>
              <InfoInner>
                {children}
              </InfoInner>
            </InfoContent>
          </Info>
        </If>
        <If condition={variant !== 'circle'}>
          <Block paint={paint}>
            {children}
          </Block>
        </If>
      </ACard>
    );
  }
}

export default AnimatedCard;
