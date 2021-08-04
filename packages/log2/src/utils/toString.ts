import { stringify } from './stringify';

export const toString = (props: any, arg1: any = null, arg2 = 0) =>
  typeof props === 'object' ? stringify(props, arg1, arg2) : String(props);

export default toString;
