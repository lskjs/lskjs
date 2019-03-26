import { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

@inject('uapp')
@observer
class IsAdmin extends Component {
  static propTypes = {
    uapp: PropTypes.object.isRequired,
    children: PropTypes.any,
  }

  static defaultProps = {
    children: null,
  }

  render() {
    if (!this.props.uapp.grant.is('admin')) return false;
    return this.props.children;
  }
}

export default IsAdmin;
