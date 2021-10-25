import Err from '@lskjs/err';

export const createValidator = (validate) => (data) => {
  if (!validate({ data })) throw new Err('INCORRECT_DATA');
  return data;
};

export default createValidator;
