import Bluebird from 'bluebird';
import mapValues from 'lodash/mapValues';

export default (obj, fn) => Bluebird.props(mapValues(obj, fn));
