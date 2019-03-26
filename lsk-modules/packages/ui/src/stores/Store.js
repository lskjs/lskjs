import set from 'lodash/set';
import { toJS, isComputedProp, action } from 'mobx';

export default class Store {
  constructor(state = {}) {
    if (state) this.setState(state);
  }


  toJS() {
    return toJS(this);
  }

  setStateField(item, value) {
    if (isComputedProp(this, item)) {
      // ignore updated
    } else {
      set(this, item, value);
    }
  }

  @action
  setState(state = {}) {
    for (const item in state) {
      this.setStateField(item, state[item]);
    }
    return this;
    // this.dispatch(state);
  }

  // listeners = [];
  // subscribe(listener) {
  //   if (typeof listener !== 'function') {
  //     throw new Error('Expected the listener to be a function.');
  //   }
  //   let isSubscribed = true;
  //   this.listeners.push(listener);
  //   return function unsubscribe() {
  //     if (!isSubscribed) return;
  //     isSubscribed = false;
  //     const index = this.listeners.indexOf(listener);
  //     this.listeners.splice(index, 1);
  //   };
  // }
  // dispatch(event) {
  //   for (let i = 0; i < this.listeners.length; i += 1) {
  //     const listener = this.listeners[i];
  //     listener(event, this);
  //   }
  // }
}
