import get from 'lodash/get';
import WorldCities from 'worldcities';

export function getCityAndCountryByLocation(location) {
  if (!location) return null;
  const { lat, lng } = location;
  const city = WorldCities.getNearestCity(lat, lng);
  return {
    country: get(city, 'country.countryCode', '').toLowerCase(),
    city: get(city, 'name'),
  };
}

export default getCityAndCountryByLocation;
