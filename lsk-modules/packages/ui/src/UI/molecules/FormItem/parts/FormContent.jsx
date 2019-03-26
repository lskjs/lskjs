import React from 'react';
import PropTypes from 'prop-types';
import { ContentWrapper } from '../FormItem.styles';

class FormContent extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <ContentWrapper {...props}>
        {children}
      </ContentWrapper>
    );
  }
}

export default FormContent;
