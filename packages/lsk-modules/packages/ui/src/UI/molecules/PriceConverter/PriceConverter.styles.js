import styled from '@emotion/styled'
import CurrencyInput from '../../../Input';

export const Title = styled('p')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: 0.2px;
  text-align: center;
  color: ${p => p.theme.colors.main};
  margin: 0 0 12px;
  
  transition: color .2s ease;
  will-change: color;
`;

export const Frame = styled('div')`
  border-radius: 4px;
  background-color: ${p => p.theme.colors.darkerBackground};
  border: 1px solid ${p => p.theme.colors.border};
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  transition: border-color .2s ease;
  will-change: border-color;
  
  &:focus-within {
    border-color: ${p => p.theme.colors.primary};
    
    ${Title} {
      color: ${p => p.theme.colors.primary};
    }
  }
`;

export const Input = styled(CurrencyInput)`
  font-family: ${p => p.theme.fontFamily} !important;
  font-size: 32px !important;
  line-height: 1.25 !important;
  letter-spacing: -0.1px !important;
  color: ${p => p.theme.colors.main} !important;
  border: none !important;
  background: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  text-align: center !important;
  display: flex !important;
  outline: none !important;
  font-weight: 500;
  font-style: normal;
  width: calc(100% - 54px);
  font-stretch: normal;
  justify-content: center;
  outline: none;
`;

export const InputWrapper = styled('div')`
  display: flex;
  align-items: center;
  max-width: 100%;
  position: relative;
  padding-left: 54px;
`;

export const Clear = styled('button')`
  background: none;
  outline: none;
  border: none;
  font-size: 18px;
  color: ${p => p.theme.colors.main};
  padding: 18px;
  display: flex;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;

export const Actions = styled('div')`
  display: flex;
  margin-top: 18px;
  justify-content: space-between;
  width: 100%;
`;

export const Action = styled('button')`
  border-radius: 0;
  background-color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.white)};
  flex: 1;
  padding: 6px 8px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  
  border: 1px solid ${p => p.theme.colors.border};

  font-family: ${p => p.theme.fontFamily};
  font-size: 11px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.1px;
  text-align: left;
  color: ${p => (p.active ? p.theme.colors.white : p.theme.colors.main)};

  transition: background-color .2s ease, color .2s ease, border-color .2s ease;
  will-change: background-color, color, border-color;

  &:first-child {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }
  
  > svg {
    font-size: 24px;
    margin-right: 8px;
    display: flex;
    flex-shrink: 0;
    color: ${p => p.theme.colors.white};
  }
  
  ${p => (!p.active && `
    > svg {
      color: ${p.theme.colors.primary};
    }
  `)}
  
  ${p => (p.active && `
    border-color: ${p.theme.colors.primary};
  `)}
`;
