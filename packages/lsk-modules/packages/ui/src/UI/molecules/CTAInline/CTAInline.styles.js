import styled from '@emotion/styled';

export const Title = styled('div')`
  font-size: 1.25rem;
  font-weight: 300;
  font-family: ${p => p.theme.fontFamily};
`;

export const Content = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  font-family: ${p => p.theme.fontFamily};
  font-weight: 300;
  ${Title} {
    margin: 0;
  }
  @media (max-width: 810px) {
    display: grid;
  }
`;

export const Block = styled('div')`
  button {
    &:not(:last-child) {
      margin-right: .5rem;
    }
  }
  @media screen and (max-width: 350px) {
    button {
      &:not(:last-child) {
        margin-bottom: .5rem;
      }
    }
  }
`;


// export const Button = styled(BsButton)`
//   height: auto;
//   padding: .6em 3.5em;
//   text-transform: uppercase;
//   letter-spacing: .5px;
//   line-height: 2;
//   font-size: .75rem;
  // &:not(:last-child) {
  //   margin-right: .5rem;
  // }
//   @media (max-width: 890px) {
//     display: flex;
//     width: 100%;
//     margin-bottom: .5rem;
//     justify-content: center;
//   }
// `;
