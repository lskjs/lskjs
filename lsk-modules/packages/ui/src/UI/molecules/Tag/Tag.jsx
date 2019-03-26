import React, { PureComponent } from 'react';
import If from 'react-if';
import Close from 'react-icons2/mdi/close';
import { Title, CloseWrapper, TagItem } from './Tag.styles';

class Tag extends PureComponent {
  render() {
    const {
      children, onClose, id, disabled,
    } = this.props;
    return (
      <TagItem disabled={disabled}>
        <Title>{children}</Title>
        <If condition={onClose}>
          <CloseWrapper
            type="button"
            onClick={() => onClose(id)}
            disabled={disabled}
          >
            <Close />
          </CloseWrapper>
        </If>
      </TagItem>
    );
  }
}

export default Tag;
