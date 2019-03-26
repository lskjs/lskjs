
import { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('i18')
@observer
class T extends Component {  //eslint-disable-line
  render() {
    const { i18, name, ...props } = this.props;
    const str = i18.t(name, props);
    // console.log('name', name, str);
    if (!str && __DEV__) return name;
    return str;
  }
}

export default T;
