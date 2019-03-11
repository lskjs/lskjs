import styled from '@emotion/styled'

export const EventFooterItem = styled('div')`
  height: auto;
  display: flex;
  margin-top: auto;
  position: relative;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.5) 100%);
  margin-bottom: -1px;
  font-family: ${p => p.theme.fontFamily};

  @media screen and (max-width: 992px) {
    flex-direction: column;
    height: auto;
  }
`;

export const AvatarContainer = styled('div')`
  position: relative;
  padding: 12px 12px 12px 24px;
  font-family: ${p => p.theme.fontFamily};
`;

export const ButtonContainer = styled('div')`
  padding: 10px 16px;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: flex-start;
  font-family: ${p => p.theme.fontFamily};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`;

export const Content = styled('div')`
  display: flex;
  width: 100%;
  overflow: hidden;
  font-family: ${p => p.theme.fontFamily};
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

export const TextContainer = styled('div')`
  padding-left: 36px;
  font-family: ${p => p.theme.fontFamily};
  overflow: hidden;
  width: 100%;
  color: ${p => p.theme.colors.white};
  margin: auto 0;
`;

export const TextItem = styled('div')`
  overflow: hidden;
  text-overflow: ellipsis;
  &:first-child {
    font-size: 24px;
    font-weight: 500;
    white-space: nowrap;
  }
  font-family: ${p => p.theme.fontFamily};
`;
