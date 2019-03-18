import styled from '@emotion/styled';

export default styled('section')`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  ${p => (p.flex && `
    flex: 1;
  `)}
  @media screen and (max-width: 890px) {
    ${p => (p.responsive && `
      width: 100%;
    `)}
  }
`;
