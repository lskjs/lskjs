import React, { PureComponent } from 'react';
// import get from 'lodash/get';
import autobind from 'core-decorators/lib/autobind';
import CalendarBase from 'antd/es/calendar';
import moment from 'moment';
import HighlightedCell from '../../../UI/atoms/HighlightedCell';

class Calendar extends PureComponent {
  static isAnyTypeDate(f) {
    return (new Date(f)).getTime() > 0;
  }
  @autobind
  validationDate(value) {
    const { field, ...props } = this.props;
    let validValue = moment(new Date());
    if (this.constructor.isAnyTypeDate(value)) {
      validValue = moment(new Date(value));
    } else if (this.constructor.isAnyTypeDate(props.defaultValue)) {
      validValue = moment(new Date(props.defaultValue));
    }
    return validValue;
  }
  render() {
    const {
      field,
      form,
      highlightedDates,
      ...props
    } = this.props;
    return (
      <CalendarBase
        {...field}
        {...props}
        onChange={(value) => {
          const selectedDate = new Date(value);
          form.setFieldValue(field.name, selectedDate);
        }}
        dateCellRender={(date) => {
          const dates = (highlightedDates || []).map(d => this.validationDate(d));
          const isValid = !!dates
            .filter(e =>
              date
                .startOf('day')
                .toDate()
                .getTime()
              ===
              e
                .startOf('day')
                .toDate()
                .getTime()).length;
          if (isValid) return <HighlightedCell />;
          return '';
        }}
        value={this.validationDate(field.value)}
        fullscreen={false}
      />
    );
  }
}

export default Calendar;

