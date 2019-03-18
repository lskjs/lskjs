import styled from '@emotion/styled';
import removeProps from '../../../utils/removeProps';

export default styled(removeProps('div', ['align']))`
  padding: 20px 16px 24px;
  position: relative;
  font-family: ${p => p.theme.fontFamily};
  text-align: ${props => props.align};
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => {
    switch (props.align) {
      case 'right': return 'flex-end';
      case 'center': return 'center';
      default: return 'flex-start';
    }
  }};
  color: #4a4a4a;

  > *:not(:last-child) {
    margin-right: 12px;
  }
`;
