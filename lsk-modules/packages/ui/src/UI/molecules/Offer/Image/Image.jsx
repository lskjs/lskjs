import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Check from 'react-icons2/mdi/check';
import Close from 'react-icons2/mdi/close';
import PlaceholderImage from './placeholder.png';
import { Status, Overlay, Block } from './Image.styles';

class Image extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    status: PropTypes.string,
    isSmall: PropTypes.bool,
  }
  static defaultProps = {
    src: null,
    status: null,
    isSmall: false,
  }
  render() {
    const { src, status, isSmall } = this.props;
    return (
      <Block
        status={status}
        small={isSmall}
        style={src ? {
          backgroundImage: `url(${src})`,
        } : {}}
      >
        <Overlay
          style={{
            backgroundImage: `url(${PlaceholderImage})`,
          }}
        />
        <Status>
          {['closed', 'rejected'].includes(status) && <Close />}
          {status === 'completed' && <Check />}
        </Status>
      </Block>
    );
  }
}

export default Image;
