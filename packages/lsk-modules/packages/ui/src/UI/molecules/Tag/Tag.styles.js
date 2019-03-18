import styled from '@emotion/styled';

export const Title = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.0;
  text-align: center;
  letter-spacing: -0.1px;
  text-align: left;
  color: ${p => p.theme.colors.primary};
`;

export const CloseWrapper = styled('button')`
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  color: ${p => p.theme.colors.primary};
  padding: 5px;
  margin-left: auto;
  font-size: 13px;
  padding: 0 2px 0 6px;
  display: flex;
  > svg {
    display: flex;
  }
`;

export const TagItem = styled('div')`
  border-radius: 100px;
  background-color: ${p => p.theme.colors.lighterPrimary};
  padding: 9px 8px;
  display: inline-flex;
  align-items: center;
  cursor: default;
  justify-content: center;
  min-width: 64px;
  ${p => (p.disabled && `
    background-color: #f9f9f9;
    ${Title} {
      color: #e3e3e3;
    }
    ${CloseWrapper} {
      color: #e3e3e3;
      cursor: not-allowed;
    }
  `)}
`;
