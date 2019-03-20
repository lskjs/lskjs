import { createElement } from 'react';
import omit from 'lodash/omit';

export default (el, list) => props =>
  createElement(el, omit(props, list));
