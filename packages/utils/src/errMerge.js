import errProps from './errProps';

export default function errMerge(params1, params2, params3) {
  const params = {};

  if (typeof params1 === 'string') {
    params.code = params1;
    if (typeof params2 === 'string') {
      params.message = params2;
    }
  }

  const res = {
    ...params,
    ...errProps(params1),
    ...errProps(params2),
    ...errProps(params3),
  };
  return res;
}
