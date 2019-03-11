import styled from '@emotion/styled'

export default styled('div')`
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
