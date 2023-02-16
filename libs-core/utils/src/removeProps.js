import omit from 'lodash/omit';
import { createElement } from 'react';

export default (el, list) => (props) => createElement(el, omit(props, list));
