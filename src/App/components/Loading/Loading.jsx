import React, { PureComponent, PropTypes } from 'react';
import css from 'importcss';
import Refresh from 'react-icons2/fa/refresh';

@css(require('./Loading.css'))
export default class Loading extends PureComponent {
  static defaultProps = {
    text: 'Загрузка...',
    icon: <Refresh />,
  }
  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.any,
  }
  render() {
    const { text, icon } = this.props;
    return (
      <div styleName="block">
        {icon}<span>{text}</span>
      </div>
    );
  }
}
