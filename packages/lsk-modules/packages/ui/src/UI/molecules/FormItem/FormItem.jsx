import React from 'react';
import PropTypes from 'prop-types';
import { Frame } from './FormItem.styles';

import FormTitle from './parts/FormTitle';
import FormContent from './parts/FormContent';
import FormHelp from './parts/FormHelp';

class FormItem extends React.PureComponent {
  static Title = FormTitle;
  static Content = FormContent;
  static Help = FormHelp;

  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <Frame {...props}>
        {children}
      </Frame>
    );
  }
}

export default FormItem;
