import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DefaultTag from 'antd/lib/tag';
import filterProps from '../utils/filterProps';

class Tags extends PureComponent {
  static propTypes = {
    items: PropTypes.array,
    options: PropTypes.array,
    values: PropTypes.array,
    disabled: PropTypes.bool,
    onDelete: PropTypes.func,
    renderTag: PropTypes.func,
    color: PropTypes.string,
  }
  static defaultProps = {
    items: null,
    options: [],
    values: [],
    disabled: false,
    onDelete: null,
    renderTag: null,
    color: 'blue',
  }
  render() {
    const {
      Tag = DefaultTag,
      options = [],
      nullValue,
      values = [],
      color = 'blue',
      items,
      disabled,
      onLink,
      children,
      onClick,
      onClose,
      closable,
      ...props
    } = this.props;
    const tags = items || options.filter(({ value }) => values.includes(value));
    if (tags.length === 0) return nullValue || null;
    return (
      <div {...filterProps(props)}>
        {tags.map((item, index) => (
          <Tag
            key={item.key || item.value || index}
            color={color}
            disabled={disabled}
            onClose={() => onClose && onClose(item)}
            onClick={() => onClick && onClick(item)}
            closable={closable && !disabled}
            children={item.title || item.children}
          />
        ))}
        {children}
      </div>
    );
  }
}

export default Tags;

