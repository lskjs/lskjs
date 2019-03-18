import styled from '@emotion/styled';
import removeProps from '../../../utils/removeProps';

export default styled(removeProps('p', ['align']))`
  padding: 8px 16px 0;
  margin: 0;
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.54;
  letter-spacing: -0.1px;
  text-align: ${props => props.align};
  color: #9b9b9b;
`;
