import pick from 'lodash/pick';
import { createElement } from 'react';

// eslint-disable-next-line react/display-name
export default (el, list) => (props) => createElement(el, pick(props, list));
