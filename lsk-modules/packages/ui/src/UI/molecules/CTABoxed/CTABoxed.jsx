import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Title,
  Content,
  Body,
} from './CTABoxed.styles';

class CTABoxed extends PureComponent {
  static propTypes = {
    transparent: PropTypes.bool,
    actions: PropTypes.any,
    title: PropTypes.string,
  };
  static defaultProps = {
    transparent: false,
    actions: null,
    title: null,
  };
  render() {
    const {
      transparent,
      actions,
      title,
    } = this.props;
    return (
      <Box transparent={transparent} >
        <Body>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <Content>
                <Title>{title}</Title>
                {actions}
              </Content>
            </div>
          </div>
        </Body>
      </Box>
    );
  }
}
export default CTABoxed;
