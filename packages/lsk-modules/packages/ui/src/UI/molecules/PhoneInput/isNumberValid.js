import { some } from 'lodash/collection';
import { startsWith } from 'lodash/string';
import { allCountries } from './countriesData';

export default function isNumberValid(inputNumber) {
  return some(allCountries, (country) => {
    return startsWith(inputNumber, country.dialCode) || startsWith(country.dialCode, inputNumber);
  });
}
