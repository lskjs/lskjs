import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import filterProps from '@lskjs/utils/filterProps';
import aggregateClassName from './aggregateClassName';

@inject('gridTableStore')
@observer
class GridTableRow extends Component {
  render() {
    console.log('renderRow');

    const {
      componentClass = 'div',
      gridTableStore: store,
      gap,
      height,
      auto,
      style,
      columns,
      header,
      children,
      ...props
    } = this.props;

    const otherStyle = {};
    if (gap) otherStyle.gridColumnGap = gap;
    if (height) otherStyle.gridAutoRows = height;
    const gridTemplateColumns = store.getColumnsWidth(store.columns) || columns || [];
    if (auto) {
      otherStyle.gridTemplateColumns = `repeat(${gridTemplateColumns.length} 1fr)`;
    } else {
      otherStyle.gridTemplateColumns = gridTemplateColumns.join(' ');
    }

    // if (header) {
    //   // height={gridTableStore.headerHeight}
    // } else {
    //   // height={gridTableStore.itemHeight}
    // }

    // console.log('@@@', componentClass, ({
    //   ...props,
    //   style: {
    //     display: 'grid',
    //     ...otherStyle,
    //     ...style,
    //   },
    //   className: aggregateClassName(props, {}),
    // }));

    // return <div>dsvfbng</div>
    const subProps = {
      ...props,
      style: {
        display: 'grid',
        ...otherStyle,
        ...style,
      },
      className: aggregateClassName(props, {}),
    };

    return React.createElement(
      componentClass,
      filterProps(subProps, componentClass),
      children,
    );
  }
}

export default GridTableRow;
