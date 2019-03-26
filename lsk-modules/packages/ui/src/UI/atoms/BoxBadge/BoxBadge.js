import styled from '@emotion/styled';
import { css } from '@emotion/core';

export default styled('div')`
  position: absolute;
  right: 1rem;
  top: 1rem;
  padding: .375rem .6rem;
  font-family: ${p => p.theme.fontFamily};
  display: inline-block;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  ${p => (p.pill && css`
    padding-right: 0.6em;
    padding-left: 0.6em;
    border-radius: 10rem;
  `)}
  ${p => (p.primary && css`
    color: #fff;
    background-color: #1890ff;
  `)}
`;
