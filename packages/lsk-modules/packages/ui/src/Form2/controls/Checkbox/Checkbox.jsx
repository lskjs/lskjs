import React from 'react';
import AntCheckbox from 'antd/lib/checkbox';
import Label from './Checkbox.styles';
import Bool from './Bool';

const BaseCheckbox = ({ onChange, validationState, ...props }) => (
  <AntCheckbox
    {...props}
    onChange={({ target: { checked } }) => onChange(checked)}
    // onChange={value => onChange(value.target.checked)}
  >
    <Label validationState={validationState} >
      {props.label}
    </Label>
  </AntCheckbox>
);

export default props => <Bool {...props} componentClass={BaseCheckbox} />;

