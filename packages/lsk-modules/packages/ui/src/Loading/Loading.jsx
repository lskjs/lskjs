import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Refresh from 'react-icons2/mdi/refresh';
import Block from './Loading.styles';

export default class Loading extends PureComponent {
  static defaultProps = {
    text: 'Загрузка...',
    icon: <Refresh />,
    full: false,
  }
  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.any,
    full: PropTypes.bool,
  };

  render() {
    const { text, icon, full } = this.props;

    return (
      <Block full={full}>
        {icon}<span>{text}</span>
      </Block>
    );
  }
}
