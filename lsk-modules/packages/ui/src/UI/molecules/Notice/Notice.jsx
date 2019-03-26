
import React from 'react';
import PropTypes from 'prop-types';
import Frame from './Notice.styles';

class Notice extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <Frame {...props}>{children}</Frame>
    );
  }
}

export default Notice;
