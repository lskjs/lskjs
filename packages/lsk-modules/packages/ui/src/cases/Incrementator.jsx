import React, { Component } from 'react';
import isFunction from 'lodash/isFunction';

export default class Incrementator extends Component {
  state = {
    count: 10,
  };
  render() {
    const panel = [
      <button onClick={() => this.setState({ count: this.state.count + -1 })}>-1</button>,
      this.state.count,
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>+1</button>,
    ];
    if (isFunction(this.props.children)) {
      return [
        this.props.children(this.state.count),
        panel,
      ];
    }
    return [this.props.children, panel];
  }
}
