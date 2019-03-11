import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Link from '../Link';

const defaultStyle = ({ theme }) => css`
  color: ${theme.colors && theme.colors.default};
  &:hover {
    color: ${theme.colors && theme.colors.darkGray};
  }
`;

const primaryStyle = ({ theme }) => css`
  color: ${theme.colors && theme.colors.primary};
  &:hover {
    color: ${theme.colors && theme.colors.primaryHover};
  }
`;

const secondaryStyle = ({ theme }) => css`
  color: ${theme.colors && theme.colors.secondary};
  &:hover {
    color: ${theme.colors && theme.colors.secondaryHover};
  }
`;

export default styled(Link)`
  text-decoration: underline;
  cursor: pointer;
  ${(props) => {
    switch (props.bsStyle) {
      case 'primary': return primaryStyle;
      case 'secondary': return secondaryStyle;
      default: return defaultStyle;
    }
  }}
`;
