import { createElement } from 'react';
import pick from 'lodash/pick';

export default (el, list) => props => createElement(el, pick(props, list));
