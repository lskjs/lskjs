import { observable, action, toJS } from 'mobx';
import round from 'lodash/round';

export default class PriceInput {
  @observable value = 0;
  @observable rate = 1;
  @observable fee = 0;
  @observable result = 0;
  @observable result2 = 0;

  @observable max = null;

  constructor(props) {
    this.update(props);
  }

  @action
  update(props) {
    if (props.rate !== null) {
      this.rate = props.rate;
    }
    if (props.fee !== null) {
      this.fee = props.fee;
    }
    if (props.max !== null) {
      this.max = props.max;
    }

    if (props.value !== null) {
      this.set('value', props.value);
      // this.value = props.value;
    } else if (props.result !== null) {
      this.set('result', props.result);
      // this.result = props.result;
    } else if (props.result2 !== null) {
      this.set('result2', props.result2);
      // this.result = props.result;
    }
    //
    // if (props.price != null) {
    //   this.changePrice(props.price);
    // } else if (props.payment != null) {
    //   this.changePrice(props.payment);
    // } else {
    //   this.changePrice(this.price);
    // }
    // if (props.max) this.max = props.max;
    // if (props.enabled) this.enabled = props.enabled;
    // this.enabled = !!props.enabled;
    //
    // this.private = !!props.private;
  }

  @action
  set(field, value) {
    // console.log('field', field, value, this.rate);

    function val(vl, max) {
      if (vl < 0) {
        return 0;
      }
      if (max && vl > max) {
        return max;
      }
      return Number(vl);
    }

    if (field === 'value') {
      this.value = round(val(value, this.max), 2);
      this.result = round(this.value * this.rate, 2);
      this.result2 = round(this.value * 0.85, 2);
      this.fee = round(this.result - this.value, 2);
    }
    if (field === 'result') {
      this.result = round(val(value, this.max * this.rate), 2);
      this.value = round(this.result / this.rate, 2);
      this.fee = round(this.result - this.value, 2);
    }
    if (field === 'result2') {
      this.result2 = round(val(value, this.max * 0.85), 2);
      this.value = round(this.result2 / 0.85, 2);
      this.result = round(this.value * this.rate, 2);
      this.fee = round(this.result - this.value, 2);
    }
    // console.log('this', this);
  }

  toJS() {
    return toJS(this);
  }
}
