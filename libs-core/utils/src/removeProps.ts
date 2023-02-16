import omit from 'lodash/omit';
import { createElement } from 'react';

// eslint-disable-next-line react/display-name
export default (el, list) => (props) => createElement(el, omit(props, list));
