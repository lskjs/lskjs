import React, { Component } from 'react';
import { css } from '@emotion/core';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';
import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';

import filterProps from '../utils/filterProps';


// const defaultStyle = ({ theme }) => css`
// color: ${theme.colors && theme.colors.default};
// &:hover {
//   color: ${theme.colors && theme.colors.darkGray};
// }
// `;


// screen and (max-width: 470px)

// export const InlineGroup = styled(FormGroup)`
// flex: 1;
// margin-bottom: 24px;
// &:first-child {
// margin-right: 12px;
// }
// &:last-child {
// margin-left: 12px;
// }
// @media screen and (max-width: 470px) {
// margin-left: 0 !important;
// margin-right: 0 !important;
// }
// `;

function getGridTemplateColumns(columns) {
  const cols = columns.map((col) => {
    if (typeof col === 'number') return `${Number(col)}px`;
    if (!col) return '0px';
    return col;
  });
  return `grid-template-columns: ${cols.join(' ')};`;
}

@inject('columns')
@observer
class TableRow extends Component {
  render() {
    const {
      componentClass = 'div',
      gap,
      height,
      auto,
      columns,
      header,
      children,
      className,
      ...props
    } = this.props;

    const styles = ['display: grid;'];
    if (gap) styles.push(`grid-column-gap: ${gap}px;`);
    if (height) styles.push(`grid-auto-rows: ${height}px;`);
    if (columns) {
      // if (auto) {
      //   styles.push(`repeat(${columns.length} 1fr)`);
      // } else {
      if (isArray(columns)) { //eslint-disable-line
        styles.push(getGridTemplateColumns(columns));
      } else {
        forEach(columns, (mediaColumns, media) => {
          // console.log({ media });
          if (!media || media === '0') {
            styles.push(getGridTemplateColumns(mediaColumns));
            return;
          }
          let mediaString;

          if (!Number.isNaN(parseInt(media, 10))) {
            mediaString = `(min-width: ${media}px)`;
            // }
            // if (typeof media === 'number') {
          } else {
            mediaString = media;
          }
          styles.push(`@media ${mediaString} { ${getGridTemplateColumns(mediaColumns)} } `);
        });
      }
      // }
    }

    const styleString = styles.join('\n');
    // console.log(styleString);
    const cssClassName = css(styleString);
    const defautlClassName = 'table-gird-row';
    // console.log({ cssClassName });


    // if (Array.isArray(children)) {
    //   children.forEach((col, i) => {
    //     if (col.props.index === null) col.props.index = i;
    //   });
    // }

    // const gridTemplateColumns = store.getColumnsWidth(store.columns) || columns || [];
    // if (auto) {
    //   otherStyle.gridTemplateColumns = `repeat(${gridTemplateColumns.length} 1fr)`;
    // } else {
    //   otherStyle.gridTemplateColumns = gridTemplateColumns.join(' ');
    // }
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
      className: cx([className, cssClassName, defautlClassName]),
    };

    return React.createElement(
      componentClass,
      filterProps(subProps, componentClass),
      children,
    );
  }
}

export default TableRow;
