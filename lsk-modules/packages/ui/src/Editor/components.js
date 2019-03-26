import styled from '@emotion/styled';

export const Button = styled('span')`
  cursor: pointer;
  color: ${props =>
    (props.reversed
      ? props.active ? 'white' : '#aaa'
      : props.active ? 'black' : '#ccc')};
`;

export const Icon = styled('div')`
  font-size: 24px;
  display: flex;
`;

export const Menu = styled('div')`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Toolbar = styled(Menu)`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 8px 8px 12px;
  margin: 0 0 20px;
  border-bottom: 2px solid #eee;
  background: #fff;
`;

export const EditorWrapper = styled('div')`
  font-family: ${p => p.theme.fontFamily};
`;
