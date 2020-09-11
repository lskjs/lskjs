import Bluebird from 'bluebird';
import mapValues from 'lodash/mapValues';

export default (...args) => Bluebird.props(mapValues(...args));
