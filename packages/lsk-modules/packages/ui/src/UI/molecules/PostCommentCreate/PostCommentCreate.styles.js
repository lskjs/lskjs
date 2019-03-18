import styled from '@emotion/styled';
import Textarea from 'react-textarea-autosize';
import AntAvatar from 'antd/lib/avatar';

export const Wrapper = styled('div')`
  display: flex;
  align-items: flex-start;
  padding: 12px 24px;
  font-family: ${p => p.theme.fontFamily};
`;

export const Avatar = styled(AntAvatar)`
  margin-right: 12px;
  flex-shrink: 0;
  margin-top: 4px;
`;

export const Input = styled(Textarea)`
  background: none;
  border: none;
  outline: none;
  font-family: ${p => p.theme.fontFamily};
  resize: none;
  padding: 0;
  margin: 6px 0 0;
  flex: 1;
`;
