import isEmpty from 'lodash/isEmpty';
import isObjectLike from 'lodash/isObjectLike';

export const isNotNull = (result) =>
  (['number', 'string', 'boolean'].includes(typeof result) && !!result) || (isObjectLike(result) && !isEmpty(result));

export default isNotNull;
