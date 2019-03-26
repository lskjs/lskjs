import React from 'react';


const SimpleInput = ({ form, field, ...props }) => {
  return (
    <input
      {...field}
      {...props}
      // onChange={(e) => {
      //   console.log('input.onChange', e);
      // }}
    />
  );
};
export default SimpleInput;
