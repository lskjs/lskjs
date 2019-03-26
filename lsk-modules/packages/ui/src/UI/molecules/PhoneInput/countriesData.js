import countriesCodes from './countriesCodes.json';

// we will build this in the loop below
const allCountries = [];
const allCountryCodes = {};
function addCountryCode(iso2, dialCode, priority) {
  if (!(dialCode in allCountryCodes)) {
    allCountryCodes[dialCode] = [];
  }
  const index = priority || 0;
  allCountryCodes[dialCode][index] = iso2;
}

// loop over all of the countries above
// allCountries2 = _.map(allCountries, function(country) {
//   return {
//     name: country[0],
//     iso2: country[1],
//     dialCode: country[2],
//     format: country[3],
//     hasAreaCodes: country.length > 4
//   }
// });

for (let i = 0; i < countriesCodes.length; i++) {  //eslint-disable-line
  // countries

  const c = countriesCodes[i];
  allCountries.push({
    name: c[0],
    iso2: c[1],
    dialCode: c[2],
    priority: c[4] || 0,
  });
  const countryIdx = allCountries.length - 1;

  // format
  if (c[3]) {
    const [,,, format] = c;
    allCountries[countryIdx].format = format;
  }

  // area codes
  if (c[5]) {
    allCountries[countryIdx].hasAreaCodes = true;
    for (let j = 0; j < c[5].length; j++) {  //eslint-disable-line
      // full dial code is country code + dial code
      const dialCode = c[2] + c[5][j];
      addCountryCode(c[1], dialCode);

      const virtualCountry = Object.assign({}, allCountries[countryIdx]);
      virtualCountry.dialCode = dialCode;
      allCountries.push(virtualCountry);
    }
  }

  // dial codes
  addCountryCode(
    allCountries[countryIdx].iso2,
    allCountries[countryIdx].dialCode,
    allCountries[countryIdx].hasAreaCodes,
  );
}

module.exports = {
  allCountries,
  allCountryCodes,
};
