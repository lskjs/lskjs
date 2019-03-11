import styled from '@emotion/styled'

export const TitleWrapper = styled('div')`
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  width: 100%;

  transition: color .2s ease-out;
  will-change: color;
  pointer-events: none;

  font-family: ${p => p.theme.fontFamily};
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: -0.1px;
  color: ${p => p.theme?.colors?.main};
  margin-bottom: 4px;
`;

export const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const HelpWrapper = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 11px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: -0.1px;
  color: #e62117;
  margin-top: 6px;
`;

export const Frame = styled('div')`
  position: relative;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  width: 100%;

  &:first-child {
    margin-top: 0;
  }

  ${p => (p.error && `
    ${HelpWrapper} {
      color: #DA4C5A;
    }
    input {
      border-color: #DA4C5A !important;
    }
    ${TitleWrapper} {
      color: #DA4C5A;
    }
    .Select-control {
      border-color: #DA4C5A !important;
    }
  `)}

  &:focus-within {
    ${TitleWrapper} {
      color: ${p => (p.error ? '#DA4C5A' : '#7070ff')};
    }
  }
`;
