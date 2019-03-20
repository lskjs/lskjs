import styled from '@emotion/styled';
import createDynamicTag from '../../../utils/createDynamicTag';

const dynamicTag = createDynamicTag('a');

export const BlogItem = styled('section')`
  border-top: 1px solid rgba(0, 0, 0, 0.117647);
  margin-top: 70px;
  padding: 70px 0 10px;
  opacity: 1;
  transform: translate(0px, 0px);
  &:first-child {
    border-top: 0;
    padding-top: 0;
    margin-top: 0;
  }
`;

export const Title = styled('h2')`
  font-size: 30px;
  font-family: ${p => p.theme.fontFamily};
  line-height: 1;
`;

export const TitleLink = styled(dynamicTag)`
  color: rgba(0,0,0,.87);
  font-family: ${p => p.theme.fontFamily};
  font-weight: 300;
  text-decoration: none;
  &:hover {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
  &:focus {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
  &:active {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
`;

export const BlogInfo = styled('div')`
  margin: 10px 0;
  font-family: ${p => p.theme.fontFamily};
  > span {
    margin-right: 8px;
  }
`;

export const AuthorLink = styled(dynamicTag)`
  color: rgba(0,0,0,.87);
  font-weight: 300;
  font-family: ${p => p.theme.fontFamily};
  text-decoration: none;
  &:active {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
  &:hover {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
  &:focus {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
`;

export const DateItem = styled('span')`
  font-family: ${p => p.theme.fontFamily};
  opacity: .7;
`;

export const Category = styled('span')`
  display: inline-block;
  font-family: ${p => p.theme.fontFamily};
  text-transform: uppercase;
  font-size: 12px;
  padding: 2px 5px;
  border-radius: ${p => p.theme.borderRadius};
  background-color: rgba(0,0,0, .08);
`;

export const CategoryLink = styled(dynamicTag)`
  color: rgba(0,0,0,.87);
  text-decoration: none;
  font-family: ${p => p.theme.fontFamily};
  opacity: .7;
  &:hover {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
  &:focus {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
  &:active {
    text-decoration: none;
    color: rgba(0,0,0,.87);
  }
`;

export const Desc = styled('p')`
  font-size: 14px;
  font-family: ${p => p.theme.fontFamily};
  opacity: .7;
`;
