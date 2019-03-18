import styled from '@emotion/styled';
import removeProps from '../../../utils/removeProps';

const filteredTag = removeProps('div', ['color', 'background']);

export default styled(filteredTag)`
  font-size: 1rem;
  padding: 0;
  height: 35px;
  font-family: ${p => p.theme.fontFamily};
  width: 35px;
  line-height: 35px;
  display: inline-block;
  text-align: center;
  border-radius: ${p => (p.theme.borderCircle)};
  color: ${p => (p.color || p.theme.colors.darkGray)};
  background-color: ${p => (p.background || p.theme.colors.white)};
  i {
    line-height: 35px;
  }
`;
