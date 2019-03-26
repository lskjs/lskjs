
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import pick from 'lodash/pick';

export default (fields, creator) => {
  @inject(...fields)
  @observer
  class Component2 extends Component {
    shouldComponentUpdate(nextProps) {
      if (nextProps.hash || this.props.hash) return nextProps.hash !== this.props.hash;
      return false;
      // return !!(
      //   nextProps.initialValues !== this.props.initialValues
      // );
    }
    render() {
      const props = pick(this.props, fields);
      const Component3 = creator(props);
      return React.createElement(Component3, this.props);
    }
  }
  return Component2;
};

