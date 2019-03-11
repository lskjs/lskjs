import styled from '@emotion/styled'
import Avatar from '../../../Avatar';

export const Content = styled('div')`
  position: relative;
  font-family: ${p => p.theme.fontFamily};
  padding: 30px;
  margin: 0 0 30px;
  font-size: 14px;
  line-height: 1.8;
  border-radius: ${p => p.theme.borderRadius};
  background-color: ${p => (p.color || p.theme.colors.white)};
  &:after {
    content: "";
    position: absolute;
    bottom: -30px;
    left: 20px;
    border-right: 30px solid transparent;
    border-top: 30px solid;
    border-top-color: ${p => (p.color || p.theme.colors.white)};
    border-bottom-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
  }
`;

export const Meta = styled('div')`
  margin: 0 0 0 30px;
  font-family: ${p => p.theme.fontFamily};
`;

export const InfoHolder = styled('div')`
  display: flex;
  font-family: ${p => p.theme.fontFamily};
  align-items: center;
`;

export const AuthorImg = styled('div')`
  margin-right: 15px;
`;

export const AvatarItem = styled(Avatar)`
  max-width: 60px;
  border-radius: ${p => p.theme.borderCircle};
  width: 30px;
  height: auto;
`;

export const AuthorDesc = styled('div')`
  margin-top: 3px;
  font-size: 12px;
  font-family: ${p => p.theme.fontFamily};
  opacity: .7;
`;
