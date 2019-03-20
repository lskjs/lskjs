import React from 'react';
import createContextToProps from '../utils/createContextToProps';

const Context = React.createContext('List');

export const { Provider, Consumer } = Context;
export const contextToProps = createContextToProps(Context);
