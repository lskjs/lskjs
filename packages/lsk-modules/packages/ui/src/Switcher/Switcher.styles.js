import styled from '@emotion/styled';

export const Label = styled('b')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.54;
  letter-spacing: -0.1px;
  text-align: right;
  color: #4a4a4a;
  margin-right: 12px;
`;

export const Handler = styled('div')`
  width: 18px;
  height: 18px;
  background-color: #fff;
  border-radius: 50px;
  margin-left: 0;

  transition: margin-left .8s ease;
  will-change: margin-left;
`;

export const Block = styled('button')`
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  width: 48px;
  height: 26px;
  outline: none;
  flex-shrink: 0;
  cursor: pointer;

  border-radius: 50px;
  background-color: #e3e3e3;
  padding: 4px;

  transition: background-color .2s ease;
  ${p => (p.validationState === 'error' && `
    background-color: ${p.theme.colors.danger};
  `)}
  will-change: background-color;
  ${p => (p.checked && `
    background-color: ${p.theme.colors.primary};
    ${Handler} {
      margin-left: auto;
    }
  `)}
`;

export const Wrap = styled('div')`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  ${p => (p.disabled && `
    ${Block} {
      background-color: #e3e3e3 !important;
      cursor: not-allowed;
    }
    ${Label} {
      color: #e3e3e3;
    }
  `)}
`;
