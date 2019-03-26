import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from 'antd/lib/icon';
import {
  Card,
  IconButton,
  BoxNum,
  TextMuted,
} from './NumberCard.styles';

class NumberCard extends PureComponent {
  static propTypes = {
    number: PropTypes.number,
    text: PropTypes.string,
  };
  static defaultProps = {
    number: null,
    text: null,
  };
  render() {
    const {
      number,
      text,
    } = this.props;
    return (
      <Card>
        <IconButton>
          <Icon type="line-chart" />
        </IconButton>
        <div>
          <BoxNum>{number}<span> %</span></BoxNum>
          <TextMuted>{text}</TextMuted>
        </div>
      </Card>
    );
  }
}
export default NumberCard;
