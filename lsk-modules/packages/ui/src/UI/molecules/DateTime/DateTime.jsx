import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import m from 'moment';
import DateBlock from '../../atoms/DateBlock';
import TimeBlock from '../../atoms/TimeBlock';

class DateTime extends PureComponent {
  static propTypes = {
    dateTime: PropTypes.any,
    dateFormat: PropTypes.any,
    timeFormat: PropTypes.any,
  }
  static defaultProps = {
    dateTime: null,
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
  }
  render() {
    const {
      dateTime,
      dateFormat,
      timeFormat,
    } = this.props;
    return (
      <React.Fragment>
        <DateBlock>
          {m(dateTime).format(dateFormat)}
        </DateBlock>
        <TimeBlock>
          {m(dateTime).format(timeFormat)}
        </TimeBlock>
      </React.Fragment>
    );
  }
}

export default DateTime;
