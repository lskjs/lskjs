import React from 'react';
import { HeaderRowWrapper, HeaderColWrapper, ItemRowWrapper, ItemColWrapper } from './Table.styles';
import Row from './TableRow';
import Col from './TableCol';

export { default as Table } from './Table';
export { default as Row } from './TableRow';
export { default as Col } from './TableCol';
export { default as Tr } from './TableRow';
export { default as Td } from './TableCol';

export const HeaderRow = props => <Row componentClass={HeaderRowWrapper} gap={12} {...props} />;
export const HeaderCol = props => <Col componentClass={HeaderColWrapper} {...props} />;
export const ItemRow = props => <Row componentClass={ItemRowWrapper} gap={12} {...props} />;
export const ItemCol = props => <Col componentClass={ItemColWrapper} {...props} />;


export const createIndex = () => { let index = 0; return () => index++ } //eslint-disable-line