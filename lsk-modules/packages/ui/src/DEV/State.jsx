import { Component } from 'react';
import isFunction from 'lodash/isFunction';

export default class State extends Component {
  constructor({ children, ...props }) {
    super();
    this.state = props;
  }
  render() {
    const { children } = this.props;
    if (!isFunction(children)) return children;
    return children(this.state, this.setState.bind(this));
  }
}
