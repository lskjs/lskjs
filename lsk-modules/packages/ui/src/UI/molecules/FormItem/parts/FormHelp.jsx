import React from 'react';
import PropTypes from 'prop-types';
import { HelpWrapper } from '../FormItem.styles';

class FormTitle extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }
  render() {
    const { children, ...props } = this.props;
    return (
      <HelpWrapper {...props}>
        {children}
      </HelpWrapper>
    );
  }
}

export default FormTitle;
