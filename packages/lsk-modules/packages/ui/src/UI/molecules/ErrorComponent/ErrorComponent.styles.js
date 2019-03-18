import styled from '@emotion/styled';

export const Wrapper = styled('section')`
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 24px;
  
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

export const ImageWrapper = styled('div')`
  flex: 0 0 62.5%;
  width: 62.5%;
  display: flex;
  justify-content: center;
  zoom: 1;
  @media screen and (max-width: 992px) {
    margin-top: 24px;
  }
`;
