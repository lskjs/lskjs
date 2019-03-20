import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import omit from 'lodash/omit';

const DEBUG = false;

export default class Component extends React.Component {
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
  removeStatePath(path) {
    const state = omit(this.state, path);
    // console.log('removeStatePath', path, state);
    return this.setStateAsync(state);
  }

  redirect(...args) {
    this.context.history.push(...args);
  }

  // if (id === 'single') return;

  setLocation(props = {}) {
    // DEBUG && console.log('setHash', id);
    if (typeof window === 'undefined') return null;
    let url = props.url || (window.location.pathname + window.location.search);
    // if (props.hash) {
    if (typeof window.history !== 'undefined' && 'pushState' in history) {
      DEBUG && console.log('history.pushState 1');
      if (props.hash) {
        url += `#${props.hash}`;
      }
      history.pushState({}, document.title, url);
      // history.pushState({ a: 123}, document.title, window.location.pathname + window.location.search + '#' + id);
    } else {
      window.location.hash = props.hash;
    }
    // } else {
    //   if (typeof window.history !== 'undefined' && "pushState" in history) {
    //     DEBUG && console.log('history.pushState 2');
    //     history.pushState({}, document.title, url);
    //   } else {
    //     window.location.hash = '';
    //   }
    // }
  }
}
