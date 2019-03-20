import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import { Provider } from 'mobx-react';

class GridTable extends PureComponent {  //eslint-disable-line
  constructor(props) {
    super();
    this.columns = props.columns;
  }
  componentDidUpdate() {
    if (!isEqual(this.columns, this.props.columns)) {
      this.columns = this.props.columns;
    }
  }
  render() {
    const { overflow, children } = this.props;
    return (
      <Provider columns={this.columns} overflow={overflow}>
        <React.Fragment>
          {children}
        </React.Fragment>
      </Provider>
    );
  }
}

export default GridTable;
