import { Component } from 'react';
// import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
// import DEV from '../DEV';

export default class OnChangeListener extends Component {
  // static contextTypes = {
  //   formik: PropTypes.object,
  // }

  componentWillReceiveProps(nextProps) {
    // console.log(
    //   nextProps.values,
    //   this.props.values,
    //   !isEqual(nextProps.values, this.props.values)
    // );
    if (!isEqual(nextProps.values, this.props.values)) {
      if (this.props.onChange) {
        this.props.onChange(nextProps.values, { props: nextProps.props });
      }
    }
  }

  render() {
    const { children } = this.props;
    return children; // || <div /> || <DEV json="OnChangeListener" />;
  }
}
