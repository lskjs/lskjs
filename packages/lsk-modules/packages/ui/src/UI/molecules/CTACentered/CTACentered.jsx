import React, { PureComponent } from 'react';
import { Container, Col } from 'reactstrap';
import If from 'react-if';
import PropTypes from 'prop-types';

import {
  Title,
  Lead,
  Muted,
  Wrapper,
} from './CTACentered.styles';

class CTACentered extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actions: PropTypes.any,
    footer: PropTypes.string,
    align: PropTypes.string,
  };
  static defaultProps = {
    title: null,
    subtitle: null,
    actions: null,
    footer: null,
    align: null,
  };
  render() {
    const {
      title,
      subtitle,
      actions,
      footer,
      align,
    } = this.props;
    return (
      <Container>
        <Col md={12}>
          <Wrapper align={align}>
            <Title>{title}</Title>
            <Lead>
              {subtitle}
            </Lead>
            {actions}
            <If condition={footer}>
              <Muted>{footer}</Muted>
            </If>
          </Wrapper>
        </Col>
      </Container>
    );
  }
}
export default CTACentered;
