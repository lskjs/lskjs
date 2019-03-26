import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import DatePickerBase from '../../../UI/molecules/Datepicker';

const DatePicker = (data) => {
  const {
    field,
    form,
    ranged,
    t,
    futureOnly,
    ...props
  } = data;
  const dateFormat = t && t('format.date') || 'DD.MM.YYYY';
  const locale = t && t('locale') || 'ru';
  let value = field.value && moment(new Date(field.value), dateFormat, locale) || null; // eslint-disable-line
  let change = (val) => {
    form.setFieldValue(field.name, val);
  };

  if (ranged) {
    value = [
      field.value?.[0] && moment(new Date(field.value[0])) || null,
      field.value?.[1] && moment(new Date(field.value[1])) || null,
    ];
    change = async (range) => {
      form.setFieldValue(field.name, range);
      // field.onChange(
      //   {
      //     target: {
      //       name: field.name,
      //       value: range[0],
      //     },
      //   },
      //   // range[0].toDate(),
      //   // range[1].toDate(),
      // );
    };
  }
  let disabledDate = () => false;
  if (futureOnly) {
    disabledDate = (current) => {
      // Can not select days before today and today
      return current.valueOf() < Date.now();
    };
  }
  return (
    <DatePickerBase
      {...field}
      {...props}
      id={(field.name || '').replace(/\./g, '')}
      ranged={ranged}
      validationState={form.errors[field.name] ? 'error' : null}
      onChange={change}
        // await this.handleChangeField(name1)(range[0].toDate());
        // await this.handleChangeField(name2)(range[1].toDate());
      value={value}
      format={dateFormat}
      disabledDate={disabledDate}
      // onBlur={e => console.log('bluuuuurr', { e })}
    />
  );
};

export default DatePicker;

