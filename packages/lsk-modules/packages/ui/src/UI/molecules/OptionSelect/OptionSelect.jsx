import React, { PureComponent } from 'react';
import If from 'react-if';
import { withTheme } from 'emotion-theming';
// import MiniUser from './MiniUser';
// import PropTypes from 'prop-types';
import { Option, Image, IconWrapper, Title } from './OptionSelect.styles';

// import omit from 'lodash/omit';

@withTheme
class OptionSelect extends PureComponent {
  render() {
    const {
      // className,
      data,
      onFocus,
      isSelected,
      selectOption,
      theme,
      // ...props
    } = this.props;
    return (
      <Option
        onClick={() => selectOption(data)}
        onFocus={onFocus}
        selected={isSelected}
      >
        <If condition={data.image}>
          {typeof data.image === 'string' ? <Image src={data.image} /> : data.image}
        </If>
        <If condition={data.icon}>
          <IconWrapper color={data.iconColor || theme.colors.secondary}>
            {(isSelected && data.iconActive) ? data.iconActive : data.icon}
          </IconWrapper>
        </If>
        <Title>
          {data.label}
        </Title>
      </Option>
    );
  }
}

export default OptionSelect;
