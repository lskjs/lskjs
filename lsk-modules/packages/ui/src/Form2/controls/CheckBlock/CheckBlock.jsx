import React from 'react';
// import get from 'lodash/get';
import ExtendedCheckblock from './ExtendedCheckblock';
import Bool from '../Checkbox/Bool';

// const CheckBlock = ({
//   field,
//   form,
//   ...props
// }) => {
//   const props2 = {
//     value: field.value,
//     validationState: form.errors[field.name] ? 'error' : null,
//     onChange: (value) => {
//       form.setFieldValue(field.name, value);
//     },
//     label: props.label || props.title || props.name,
//     info: props.info,
//   };
//   return (
//     <ExtendedCheckblock
//       {...field}
//       {...props}
//       {...props2}
//       onChange={props.onChange || props2.onChange}
//       children={props.children}  //eslint-disable-line
//     />
//   );
// };

// export default CheckBlock;


const BaseExtendedCheckblock = ({ checked, view, ...props }) => (
  <ExtendedCheckblock
    {...props}
    type={view}
    value={checked}
    // onChange={({ target: { checked } }) => onChange(checked)}
    // onChange={value => onChange(value.target.checked)}
  />
);

export default props => <Bool {...props} componentClass={BaseExtendedCheckblock} />;

