import styled from '@emotion/styled';


export const Option = styled('div')`
  display: flex;
  align-items: center;
  overflow: hidden;
  border: none;

  
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  background-color: ${p => p.theme.colors.white};
  letter-spacing: -0.1px;
  color: ${p => p.theme.colors.main};
`;

export const Image = styled('img')`
  width: 32px;
  height: 32px;
  border-radius: 4px;
`;

export const Title = styled('div')`
  margin-left: ${p => (p.image ? '8px' : '0px')};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Icon = styled('div')`
  font-size: 18px;
  margin-right: ${p => (p.icon ? '8px' : '0px')};
`;
