import styled from '@emotion/styled';

export const Icon = styled('button')`
  background: none;
  outline: none;
  border: none;
  color: ${p => p.theme.colors.primary};
  font-size: 24px;
  margin: 0;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  > svg {
    max-width: 24px;
    min-width: 24px;
  }
`;

export const Item = styled('div')`
  display: inline-flex;
  align-items: flex-start;
  input {
    display: none;
  }
  label {
    margin-bottom: 0;
    line-height: 1;
    margin-left: 8px !important;
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.1px;
    text-align: left;
    font-family: ${p => p.theme.fontFamily};
    color: #4a4a4a;
    cursor: pointer;
  }
  ${(p) => {
    switch (p.validationState) {
      case 'error':
        return `
        ${Icon} {
          color: #da4c5a;
        }
        label {
          color: #da4c5a;
        }
`;
      default:
        return '';
    }
  }}  
${p => (p.selected && `
    ${Icon} {
      color: ${p.theme.colors.primary};
      cursor: default;
    }
    label {
      cursor: default;
      color: #4a4a4a !important;
    }
    `)}
  ${p => (p.disabled && `
    ${Icon} {
      color: #e3e3e3 !important;
      cursor: not-allowed;
    }
    label {
      color: #e3e3e3 !important;
      cursor: not-allowed;
    }
    cursor: not-allowed;
    &:hover label {
      color: ${p.theme.colors.primary};
    }
    `)}
`;
