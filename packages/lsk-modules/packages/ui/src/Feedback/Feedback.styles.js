import styled from '@emotion/styled'

export const Title = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  margin: 8px 0 24px;
  font-size: 24px;
  line-height: 0.75;
  text-align: left;
  color: #4a4a4a;
`;

export const Desc = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 15px;
  line-height: 1.33;
  text-align: center;
  color: #4a4a4a;
  margin-top: 24px;
`;

export const Rating = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;

  > div:first-child > ul {
    font-size: 24px !important;
  }

  > div:first-child > ul > li {
    margin-right: 8px !important;
  }
`;

export const FbVal = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 32px;
  line-height: 1.25;
  letter-spacing: -0.1px;
  text-align: left;
  color: #4a4a4a;
  margin-top: 8px;
`;

export const Block = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
