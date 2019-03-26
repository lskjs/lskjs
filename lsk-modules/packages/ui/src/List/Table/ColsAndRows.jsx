import React from 'react';
import { inject, observer } from 'mobx-react';
import { HeaderRowWrapper, HeaderColWrapper, ItemRowWrapper, ItemColWrapper } from './ColsAndRows.styles';
import { Row, Col } from '../../Table';


const stopPropagation = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

const addStopPropagation = (props) => {
  if (props.onClick || !(props.clickable || props.stopPropagation)) return props;
  return {
    ...props,
    onClick: stopPropagation,
  };
};

export const HeaderCol = props => <Col componentClass={HeaderColWrapper} {...addStopPropagation(props)} />;
export const ItemCol = props => <Col componentClass={ItemColWrapper} {...addStopPropagation(props)} />;
export const HeaderRow = props => <Row componentClass={HeaderRowWrapper} gap={12} {...props} />;
export const ItemRow = props => <Row componentClass={ItemRowWrapper} gap={12} {...props} />;
