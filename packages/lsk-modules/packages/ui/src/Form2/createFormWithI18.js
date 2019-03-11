import React, { Component, PureComponent } from 'react';
import isFunction from 'lodash/isFunction';
import { inject, observer } from 'mobx-react';
import createForm from './createForm';

const createFormWithI18 = (callback) => {
  if (!isFunction(callback)) {
    return createForm(callback);
  }

  @inject('i18', 'config')
  // @observer
  class Component2 extends Component {
    shouldComponentUpdate(nextProps) {
      return !!(nextProps.hash && this.props.hash && nextProps.hash !== this.props.hash);
    }
    render() {
      const { i18, config, ...props } = this.props;
      const params = callback({ i18, config });
      const Component3 = createForm(params);
      // console.log('createFormWithI18', props);

      return <Component3 {...props} />;
    }
  }

  return Component2;
};

export default createFormWithI18;
