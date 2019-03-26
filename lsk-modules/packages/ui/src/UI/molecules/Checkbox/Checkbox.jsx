import React, { PureComponent } from 'react';
import ACheckbox from 'antd/lib/checkbox';

class Checkbox extends PureComponent {
  render() {
    return (
      <ACheckbox {...this.props} />
    );
  }
}

export default Checkbox;
