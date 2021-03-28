import Bluebird from 'bluebird';
import { maxBy } from 'lodash';
import get from 'lodash/get';
import minBy from 'lodash/minBy';
import kmeans from 'node-kmeans';

import { getLocationsDistance } from './locations';

const kMeansClusterize = Bluebird.promisify(kmeans.clusterize);

// {
//   “centroid”: [
//        106.924981,
//        -6.3214015
//   ],
//   “cluster”: [
//        [
//          106.92533,
//          -6.321741
//        ],
//        [
//          106.924632,
//          -6.321062
//        ]
//   ],
//   “clusterInd”: [
//          1,
//          2
//   ]
// },
// TODO: kMeansClusterize.k  in config => определять как-то динамически
export async function getCentroidLocation(locations = []) {
  if (!locations.length) return null;
  const vectors = locations.map((location) => [location.lng, location.lat]);
  const k = locations.length < 5 ? locations.length : 5;
  const groups = await kMeansClusterize(vectors, { k }); // kSize надо как-то подбирать, может выдавать рандом
  const max = maxBy(groups, 'cluster.length');
  if (!max.centroid) return null;
  return { lng: get(max, 'centroid.0'), lat: get(max, 'centroid.1') };
}

export async function getAverageLocation(locations = []) {
  const centroid = await getCentroidLocation(locations);
  if (!centroid) return null;
  return minBy(locations, (l) => getLocationsDistance(l, centroid));
}

export default getAverageLocation;
