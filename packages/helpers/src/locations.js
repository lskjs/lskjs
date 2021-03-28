import minBy from 'lodash/minBy';

export function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export function rad2deg(rad) {
  return rad * 180 / Math.PI;
}

export function avgLocation(locations) {
  if (locations.length <= 1) {
    return locations[0];
  }

  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  // eslint-disable-next-line no-restricted-syntax
  for (const coord of locations) {
    const lat = deg2rad(coord.lat);
    const lng = deg2rad(coord.lng);
    x += Math.cos(lat) * Math.cos(lng);
    y += Math.cos(lat) * Math.sin(lng);
    z += Math.sin(lat);
  }

  const total = locations.length;

  x /= total;
  y /= total;
  z /= total;

  const centralLng = Math.atan2(y, x);
  const centralSquareRoot = Math.sqrt(x * x + y * y);
  const centralLat = Math.atan2(z, centralSquareRoot);

  return {
    lat: rad2deg(centralLat),
    lng: rad2deg(centralLng),
  };
}

export function getLocationsDistance({ lat: lat1, lng: lon1 }, { lat: lat2, lng: lon2 }) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


export function getAvgLocationFromPosts(locations) {
  if (!locations) return null;
  const avg = avgLocation(locations);
  if (!avg) return null;
  return minBy(locations, l => getLocationsDistance(l, avg));
}
