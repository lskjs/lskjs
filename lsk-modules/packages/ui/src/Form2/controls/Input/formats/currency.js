import CurrencyFormat from 'react-currency-format';

export default ({ form, field }) => ({
  componentClass: CurrencyFormat,
  thousandSeparator: true,
  decimalSeparator: '.',
  onBlur: () => {
    const value = parseFloat((field.value).replace(/[^\w.?]+/g, ''));
    form.setFieldValue(field.name, value);
  },
});
