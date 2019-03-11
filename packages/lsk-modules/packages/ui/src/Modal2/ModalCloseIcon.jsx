import React from 'react';
import Close from 'react-icons2/mdi/close';

import Button from '../Button';
import { closeButtonStyle } from './Modal2.styles';

export default props => (
  <Button
    type="button"
    view="transparent"
    icon={<Close />}
    className={closeButtonStyle}
    {...props}
  />
);
