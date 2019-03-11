import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import m from 'moment';
import StatusWrapper from '../../atoms/StatusWrapper';
import StatusDotWrapper from '../../atoms/StatusDotWrapper';
import StatusTitle from '../../atoms/StatusTitle';
import StatusSubtitle from '../../atoms/StatusSubtitle';
import StatusDot from '../../atoms/StatusDot';

class StatusBlock extends PureComponent {
  static propTypes = {
    title: PropTypes.any,
    paint: PropTypes.string,
    dateTime: PropTypes.any,
    dateFormat: PropTypes.any,
    timeFormat: PropTypes.any,
  }
  static defaultProps = {
    title: null,
    paint: null,
    dateTime: null,
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
  }
  render() {
    const {
      title,
      paint,
      dateTime,
      dateFormat,
      timeFormat,
    } = this.props;
    return (
      <StatusWrapper>
        <div>
          <StatusTitle>{title}</StatusTitle>
          <StatusSubtitle>
            {m(dateTime).format(dateFormat)} {m(dateTime).format(timeFormat)}
          </StatusSubtitle>
        </div>
        <StatusDotWrapper>
          <StatusDot color={paint} />
        </StatusDotWrapper>
      </StatusWrapper>
    );
  }
}

export default StatusBlock;
