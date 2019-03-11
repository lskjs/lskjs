import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Content, Title, Block } from './CTAInline.styles';

class CTAInline extends PureComponent {
  static propTypes = {
    title: PropTypes.any,
    actions: PropTypes.any,
  };
  static defaultProps = {
    title: null,
    actions: null,
  };
  render() {
    const {
      title,
      actions,
    } = this.props;
    return (
      <Content>
        <Title>{title}</Title>
        <Block>
          {actions}
        </Block>
      </Content>
    );
  }
}
export default CTAInline;
