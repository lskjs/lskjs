import React, { PureComponent } from 'react';
import Block from './TagsWrapper.styles';

class TagsWrapper extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Block>
        {children}
      </Block>
    );
  }
}

export default TagsWrapper;
