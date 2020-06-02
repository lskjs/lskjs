import Promise from 'bluebird';
import mapValues from 'lodash/mapValues';

export default (obj, fn) => Promise.props(mapValues(obj, fn));
