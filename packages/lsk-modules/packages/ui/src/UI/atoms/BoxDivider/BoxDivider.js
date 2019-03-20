import styled from '@emotion/styled';

import removeProps from '../../../utils/removeProps';

const filteredTag = removeProps('div');

export default styled(filteredTag)`
  font-family: ${p => p.theme.fontFamily};
  height: 1px;
  background-color: rgba(0,0,0,.1);
  margin: 0 1.25rem;
`;
