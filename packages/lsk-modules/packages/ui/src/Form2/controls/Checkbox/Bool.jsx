import React from 'react';
// import DEV from '../../../DEV';

const Bool = ({
  field,
  form,
  checked,
  value,
  componentClass: Component = 'div',
  onChange,
  validationState,
  children,
  ...props
}) => {
  const newProps = {};
  if (typeof value !== 'undefined' || typeof checked !== 'undefined') {
    newProps.checked = !!value || !!checked;
  } else if (field && typeof field.value !== 'undefined') {
    newProps.checked = !!field.value;
  }
  // console.log({ newProps });

  return (
  // <div>
  //   {Math.random()}
  //   <DEV json={{ newProps }} />

    <Component
      {...props}
      {...newProps}
      onChange={(newValue) => {
        if (onChange) {
          onChange(newValue);
        } else if (form && field) {
          form.setFieldValue(field.name, newValue);
        }
      }}
      validationState={validationState || (field && form && form.errors[field.name] ? 'error' : null)}
    >
      {children}
    </Component>
  // </div>
  );
};

export default Bool;

