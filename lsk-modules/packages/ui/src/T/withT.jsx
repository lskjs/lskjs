import React from 'react';
import { inject, observer } from 'mobx-react';

const withT = (Component, fn = a => a) => (
  inject('t')(observer(props => <Component {...fn(props)} />))
);

export default withT;
