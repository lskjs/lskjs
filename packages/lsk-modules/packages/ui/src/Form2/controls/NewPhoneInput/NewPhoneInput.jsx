import React from 'react';
import PhoneInput from 'react-phone-input-2';

export default ({ field, form, ...props }) => (
  <PhoneInput
    defaultCountry="ru"
    {...field}
    {...props}
    value={(field.value || '').startsWith('+') ? field.value : `+${field.value}`}
    onChange={(value) => {
      form.setFieldValue(field.name, value.replace(/\D+/g, ''));
    }}
  />
);
