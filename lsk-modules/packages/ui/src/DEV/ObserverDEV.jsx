import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import DEV from './DEV';

@observer
class ObserverDEV extends Component {
  render() {
    const { json } = this.props;
    return <DEV json={toJS(json)} />;
  }
}

export default ObserverDEV;
