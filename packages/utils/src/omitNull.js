import pickBy from 'lodash/pickBy';

export const isNotNull = (a) => a != null;
export const omitNull = (obj) => pickBy(obj, isNotNull);

export default omitNull;
