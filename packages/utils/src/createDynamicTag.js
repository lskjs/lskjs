import PropTypes from 'prop-types';
import { createElement } from 'react';
// import filterProps from './filterProps';

function createDynamicTag(tag = 'div') {
  const dynamicTag = ({ componentClass, children, ...props }) =>
    createElement(
      componentClass,
      // filterProps(props, componentClass),
      props,
      children,
    );

  dynamicTag.propTypes = {
    componentClass: PropTypes.any,
    children: PropTypes.any,
  };

  dynamicTag.defaultProps = {
    componentClass: tag,
  };

  return dynamicTag;
}

export default createDynamicTag;
