import styled from '@emotion/styled';

export default styled('section')`
  display: flex;
  background-color: #fff;
  height: 48px;
  outline: none;
  > * {
    border-radius: 3px;
    display: flex;
  }
  > input {
    flex: 1;
    &:focus {
      border-color: #e3e3e3 !important;
    }    
  }
  &:focus-within > * {
    border-color: ${p => p.theme.colors.primary} !important;
  }
  &:focus-within > *:focus {
    border-color: ${p => p.theme.colors.primary} !important;
  }
  > *:first-child {
    border-radius: 3px 0 0 3px;
  }
  > *:last-child {
    border-radius: 0 3px 3px 0 !important;
  }
  > *:not(:first-child) {
    border-left: none;
    border-radius: 0;
  }
  ${p => (p.disabled && `
    background-color: rgba(155, 155, 155, 0.03);
    > input {
      background-color: transparent !important;
    }
  `)}
  ${p => (p.uniform && `
    > *:not(:first-child) {
      border-left: none;
      border-right: none;
    }
    > *:first-child:not(:last-child) {
      border-right: none;
    }
    > *:last-child {
      border-left: none;
      border-right: 1px solid #e3e3e3 !important;
    }
    &:focus-within > *:last-child {
      border-right-color: ${p.theme.colors.primary} !important;
    }    
  `)}
`;
