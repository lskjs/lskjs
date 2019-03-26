import styled from '@emotion/styled';

export const Header = styled('div')`
  width: 278px;
  background-color: ${p => p.theme.colors.lighterPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
`;

export const Radio = styled('div')`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  flex-shrink: 0;
  color: white;
  border: 2px solid #d7e2f9;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  > svg {
    display: flex;
    font-size: 13px;
  }
`;

export const Icon = styled('div')`
  color: #c5d6e8;
  font-size: 64px;
`;

export const Info = styled('div')`
  background-color: white;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  height: 84px;
`;

export const Title = styled('b')`
  font-size: 13px;
  line-height: 1.43;
  letter-spacing: -0.1px;
  text-align: left;
  color: #4a4a4a;
  font-weight: normal;
  margin-bottom: 6px;
`;

export const Desc = styled('p')`
  font-size: 13px;
  line-height: 1.43;
  letter-spacing: -0.1px;
  text-align: left;
  color: #9b9b9b;
  margin: 0;
`;

export const Block = styled('button')`
  width: 280px;
  height: 200px;
  background-color: #ffffff;
  border: solid 1px #e3e3e3;
  display: flex;
  flex-direction: column;
  outline: none;
  padding: 0;
  cursor: pointer;
  ${p => (p.checked && `
    border-color: ${p.theme.colors.primary};
    ${Radio} {
      border: none;
      background-color: ${p.theme.colors.primary};
    }
  `)}
  ${(p) => {
    switch (p.validationState) {
      case 'error':
        return `
          border-color: #da4c5a;
        `;
      default:
        return '';
    }
  }}
`;
