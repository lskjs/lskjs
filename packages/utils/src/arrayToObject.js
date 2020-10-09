import fromPairs from 'lodash/fromPairs';

export default (array = []) => fromPairs(array.map((name) => [name, name]));
