import styled from '@emotion/styled';
import createDynamicTag from '../../../utils/createDynamicTag';

export const CommentWrapper = styled('div')`
  display: flex;
  align-items: flex-start;
`;

export const AvatarWrapper = styled('div')`
  display: flex;
  margin-right: 24px;
  flex-shrink: 0;
`;

export const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding-top: 12px;
`;

export const BodyWrapper = styled('div')`
  white-space: pre-line;
`;

const dynamicTag = createDynamicTag('span');
export const TitleWrapper = styled(dynamicTag)`
  color: inherit;
  text-decoration: none;
`;

export const DateWrapper = styled('span')`
  color: ${p => p.theme.colors.secondary};
  font-size: 12px;
  padding-left: 12px;
  font-weight: normal;
  @media screen and (max-width: 768px) {
    display: block;
    padding-left: 0;
  }
`;
