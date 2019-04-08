import React from 'react';
import pick from 'lodash/pick';

const createContextToProps = Context => (...params) => Component => props => (
  React.createElement(Context.Consumer, {}, context => (
    React.createElement(Component, {
      ...pick(context, params),
      ...props,
    })
  ))
);

export default createContextToProps;
