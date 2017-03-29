import React from 'react';
import BaseSlide from 'lsk-general/General/Slide';
import { inject } from 'mobx-react';

function Slide(props) {
  const slide = props.config.site && props.config.site.slide || {};
  return (
    <BaseSlide
      full
      overlay
      {...slide}
      {...props}
    />
  );
}

export default inject('config')(Slide);
