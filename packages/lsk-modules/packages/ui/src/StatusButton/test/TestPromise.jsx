import React, { Component } from 'react';
import omit from 'lodash/omit';
import StatusButton from '../StatusButton';

// const PROMISE_TIMEOUT = 2000;

export default class TestPromise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
    };
  }

  getData = () => {
    this.promise = new Promise((resolve, reject) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.props.error ? reject(false) : resolve(true);
      }, this.props.promiseTimeout || 2000);
    });
    this.setState({ fetching: true });
    return this.promise;
  }

  handleClick = async () => {
    const result = await this.getData();
    this.props.onClick && this.props.onClick(result);
  }

  render() {
    return (
      <StatusButton
        {...omit(this.props, ['promiseTimeout', 'error', 'success', 'loading'])}
        promise={this.promise}
        onClick={this.handleClick}
      />
    );
  }
}
