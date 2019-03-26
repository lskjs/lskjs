import React2 from 'react';

const createNestedFormControl = (Component, React = React2) => ({ children, ...props }) => {
  const { form, field, ...otherProps } = props;
  const { value } = field;
  return React.createElement(
    Component,
    {
      ...otherProps,
      initialValues: value,
      onChange: (values) => {
        form.setFieldValue(field.name, values);
      },
    },
    children,
  );
};
export default createNestedFormControl;
