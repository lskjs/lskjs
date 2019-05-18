import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import filterProps from '@lskjs/utils/filterProps';
import aggregateClassName from './aggregateClassName';

@inject('gridTableStore')
@observer
class GridTableCol extends Component {
  render() {
    const {
      componentClass = 'div',
      gridTableStore: store,
      index,
      style,
      children,
      ...props
    } = this.props;

    if (!store.isVisibleColumn(index)) return null;
    const cell = store.columns[index];
    if (!cell) return null;

    const otherStyle = {
      ...(cell.style || {}),
    };
    if (cell.index) otherStyle.gridColumn = cell.index + 1;
    // if (cell.style) otherStyle.gridColumn = cell.index + 1;
    // if (cell.row) otherStyle.gridRow = cell.row;
    // if (cell.flex) otherStyle.gridRow = cell.row;

    // console.log('@@@@@', store.columns);
    // console.log(toJS(cell));
    // console.log(cell.index);
    // console.log(cell.column);
    // console.log(cell.row);


    const subProps = {
      ...props,
      style: {
        ...otherStyle,
        ...style,
        // flex: (cell.flex || 0),
        // justifyContent: cell.flex && (
        //   cell.align === 'right' ? 'flex-end' :  //eslint-disable-line
        //     cell.center === 'right' ? 'center'
        //       : 'flex-start'
        // ),
        // ...(cell.style || {}),
      },
      className: aggregateClassName(props, cell),
    };

    return React.createElement(
      componentClass,
      filterProps(subProps, componentClass),
      children,
    );
  }
}

export default GridTableCol;
