export { default as Table } from './Table';
export { default as Row } from './TableRow';
export { default as Col } from './TableCol';
export { default as Tr } from './TableRow';
export { default as Td } from './TableCol';
export const createIndex = () => { let index = 0; return () => index++; }; // eslint-disable-line no-plusplus
