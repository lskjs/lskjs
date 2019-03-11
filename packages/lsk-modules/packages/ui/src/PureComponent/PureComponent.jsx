import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';

export default class PureComponent extends React.PureComponent {
  static contextTypes = {
    history: PropTypes.object,
  };

  setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve));
  }

  getStatePath(path) {
    return get(this.state, path);
  }

  setStatePath(path, value) {
    const state = cloneDeep(this.state);
    set(state, path, value);
    return this.setStateAsync(state);
  }

  redirect(...args) {
    this.context.history.push(...args);
  }
}
