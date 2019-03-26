import styled from '@emotion/styled';
import { css } from '@emotion/core';
import removeProps from '../../../utils/removeProps';

export const Title = styled(removeProps('div', ['align']))`
  padding: 11px 44px 11px 16px;
  margin: 0;
  display: flex;
  align-items: center;
  background-color: ${p => p.theme.colors.primary};
  height: 56px;
  font-family: ${p => p.theme.fontFamily};
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: -0.1px;
  color: ${p => p.theme.colors.white};
  box-sizing: border-box;
  border-radius: 8px 8px 0 0;
`;

export const buttonStyle = css`
  margin-left: -6px;
  margin-right: 6px;
`;
