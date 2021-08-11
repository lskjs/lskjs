import pick from 'lodash/pick';
import { createElement } from 'react';

export default (el, list) => (props) => createElement(el, pick(props, list));
