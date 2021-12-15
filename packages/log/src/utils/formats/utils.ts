import { tryJSONparse } from '../tryJSONparse';

// eslint-disable-next-line import/prefer-default-export
export const parseArgs = (msg: any, data: any): any[] => {
  const args = [];
  if (msg !== null) args.push(tryJSONparse(msg));
  if (Object.keys(data).length) args.push(data);
  return args;
};
