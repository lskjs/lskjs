import React from 'react';
import ArrowDown from 'react-icons/lib/fa/sort-desc';
import ArrowUp from 'react-icons/lib/fa/sort-asc';
import Sort from 'react-icons/lib/fa/sort';

const SortDirection = ({ value, size = 14 }) => (
  value === 1 ? // eslint-disable-line no-nested-ternary
    <ArrowDown size={size} /> :
    value === -1 ?
      <ArrowUp size={size} /> :
      <Sort size={size} />
);


export default ({
  children, value, size, align = 'left', ...props
}) => (
  <div style={{ cursor: 'pointer' }} {...props}>
    {align === 'right' && <SortDirection value={value} size={size} />}
    {children}
    {align !== 'right' && <SortDirection value={value} size={size} />}
  </div>
);
