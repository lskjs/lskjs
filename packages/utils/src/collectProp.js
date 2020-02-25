import get from 'lodash/get';

export default (obj, name) => get(obj, `props.${name}`, get(obj, `constructor.${name}`));
