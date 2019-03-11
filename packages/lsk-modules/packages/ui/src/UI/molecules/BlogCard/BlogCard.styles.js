import styled from '@emotion/styled'

export const Wrapper = styled('article')`
  border: 1px solid ${p => p.theme.colors.border};
  background: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.borderRadius};
  overflow: hidden;
  max-width: 600px;
`;

export const Img = styled('img')`
  width: 100%;
  max-width: 100%;
`;

export const ImgContainer = styled('div')`
  height: 50%;
`;

export const Body = styled('div')`
  border-radius: 0 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius};
  padding: 1.625rem;
  font-family: ${p => p.theme.fontFamily};
`;

export const Date = styled('span')`
  opacity: .7;
  font-family: ${p => p.theme.fontFamily};
`;

export const Title = styled('h4')`
  line-height: 1.625rem;
  font-size: 1em;
  font-family: ${p => p.theme.fontFamily};
  margin: 5px 0;
  font-weight: 500;
  color: ${p => p.theme.colors.main};
`;


export const FlexContainer = styled('div')`
  @media screen and (min-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    flex-direction: row;
    align-items: stretch;
  }
`;

export const FlexItem = styled('div')`
   @media screen and (min-width: 992px) {
    flex: 0 1 calc(50% - 1em);
    margin-left: 1em;
    margin-right: 1em;

    &:nth-child(2n+1) {
      margin-left: 0;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
   }
   @media screen and (min-width: 1200px) {
    flex: 0 1 calc(33% - 2em);
    margin-left: 1.5em;
    margin-right: 1.5em;

    &:nth-child(2n+1) {
      margin-left: 1.5em;
    }
    &:nth-child(2n) {
      margin-right: 1.5em;
    }

    &:nth-child(3n+1) {
      margin-left: 0;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
   }
`;
