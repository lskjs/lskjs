import styled from '@emotion/styled';
import { css } from '@emotion/core';

export const Container = styled('div')`
  /* background: #ddd; */
  /* padding: 0;
  margin: 0; */
  /* margin-left: -20px;
  margin-top: -10px; */
  display: flex;
  flex-flow: row wrap;
  /* justify-content: space-between; */
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  margin-left: -10px;
  margin-top: -10px;
`;

export const Item = styled('div')`
  display: flex;
  margin-left: 10px;
  margin-top: 10px;
`;

export const rightOrLeft = css`
  margin-left:0px;
  margin-right:0px;

  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  align-items: center;
`;

export const Left = styled('div')`
  ${rightOrLeft}
  justify-content: flex-start;
`;

export const Right = styled('div')`
  ${rightOrLeft}
  justify-content: flex-end;
`;
