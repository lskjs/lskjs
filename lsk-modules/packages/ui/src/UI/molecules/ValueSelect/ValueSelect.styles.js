import styled from '@emotion/styled';


export const Option = styled('div')`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  border: none;


  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.1px;
  color: #4a4a4a;
`;

export const Image = styled('img')`
  width: 32px;
  height: 32px;
  border-radius: 4px;
`;

export const Title = styled('div')`
  margin-left: ${p => (p.image ? '8px' : '0px')};
`;

export const Icon = styled('div')`
  margin-right: ${p => (p.icon ? '8px' : '0px')};
  margin-top: ${p => (p.icon ? '4px' : '0px')};
`;
