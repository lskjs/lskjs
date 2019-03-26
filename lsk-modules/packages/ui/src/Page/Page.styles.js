import styled from '@emotion/styled';

export default styled('main')`
  width: 100%;
  background-color: ${p => p.theme.colors.mainBackground};
  padding: 4px 8px 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  ${p => (p.dark && `
    background-color: #f0f0f0;
  `)}
  ${p => (p.continuous && `
    flex: 1;
  `)}
`;


export const PageTitle = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: -0.1px;
  text-align: left;
  color: ${p => p.theme.colors.main};
  margin: 16px 0;
  display: flex;
  align-items: flex-end;
  min-height: 40px;
  width: 100%;
  position: relative;
  @media screen and (max-width: 450px) {
    align-items: center !important;
  }
`;
