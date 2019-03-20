import styled from '@emotion/styled';
import removeProps from '../../../utils/removeProps';

export default styled(removeProps('h2', ['align']))`
  padding: 8px 16px 0;
  margin: 0;
  font-family: ${p => p.theme.fontFamily};
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.43;
  letter-spacing: -0.1px;
  color: #4a4a4a;
  text-align: ${props => props.align};
`;
