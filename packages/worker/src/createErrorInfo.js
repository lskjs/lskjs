import Err from '@lskjs/utils/Err';
import keyBy from 'lodash/keyBy';

export function createErrorInfo(errors = []) {
  const errorsByCode = keyBy(errors, 'code');
  const defaultError = {
    nack: 1,
    telegram: 1,
    redelivered: 1,
    log: 'error',
  };

  return function (err) {
    const code = Err.getCode(err);
    const error = errorsByCode[code] || {};
    return {
      ...defaultError,
      ...error,
      ...Err.getJSON(err),
    };
  };
}

export default createErrorInfo;
