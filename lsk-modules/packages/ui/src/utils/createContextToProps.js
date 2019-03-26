import React from 'react';
import pick from 'lodash/pick';
// const hello = React.createElement('div', {}, 'hello');
const createContextToProps = Context => (...params) => Component => props => (
  // hello
  React.createElement(Context.Consumer, {}, context => (
    React.createElement(Component, {
      ...pick(context, params),
      ...props,
    })
  ))
);

export default createContextToProps;
