import styled from '@emotion/styled';
import { css } from 'emotion';
import createDynamicTag from '../../../utils/createDynamicTag';

const dynamicTag = createDynamicTag('a');

export const ItemCard = styled('div')`
  position: relative;
  transition: 0.2s linear;
  border-radius: ${p => p.theme.borderRadius};
  font-family: ${p => p.theme.fontFamily};
  &:hover {
    box-shadow: 0 0 15px rgba(0,0,0, .1);
  }
`;

export const CardImage = styled(dynamicTag)`
  display: block;
  text-decoration: none;
  font-family: ${p => p.theme.fontFamily};
  padding: 30px 15px;
  height: 300px;
  width: 50%;
  border-radius: ${p => p.theme.borderRadius} 0 0 ${p => p.theme.borderRadius};
  background-color: rgba(0,0,0, .035);;
  text-align: center;
`;

export const CardBody = styled('div')`
  border-radius: 0 ${p => (p.theme.borderRadius)} ${p => (p.theme.borderRadius)} 0;
  width: 50%;
  height: 100%;
  position: absolute;
  font-family: ${p => p.theme.fontFamily};
  top: 0;
  right: 0;
  padding: 40px 30px;
  color: ${p => (p.theme.colors.darkGray)};
  background-color: ${p => (p.theme.colors.white)};
`;

export const CardTitle = styled('div')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 1rem;
`;

export const CardPrice = styled('div')`
  position: absolute;
  font-family: ${p => p.theme.fontFamily};
  top: 30px;
  right: 30px;
`;

export const StrikeThroughItem = styled('span')`
display: block;
color: ${p => (p.theme.colors.gray600)};
${p => (p.isPierced && css`
  opacity: .5;
  text-decoration: line-through;
`)}
`;

export const Divider = styled('div')`
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: transparent;
  margin-top: 10px;
  margin-bottom: 10px;
  border-style: solid;
  border-color: rgba(0,0,0, .1);
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const CardDesc = styled('p')`
  margin: 0 25% 3em 0;
  opacity: .7;
  font-family: ${p => p.theme.fontFamily};
`;

export const Image = styled('img')`
  max-width: 100%;
  max-height: 100%;
`;

export const TitleLink = styled(dynamicTag)`
  color: ${p => (p.theme.colors.darkGray)};
  font-weight: 500;
  text-decoration: none;
  font-family: ${p => p.theme.fontFamily};
`;

export const TitleSpan = styled('span')`
  display: block;
  font-size: .75rem;
  opacity: .5;
  font-family: ${p => p.theme.fontFamily};
`;

