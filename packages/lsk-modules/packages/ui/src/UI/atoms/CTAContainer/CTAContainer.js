import styled from '@emotion/styled'

import Col from 'reactstrap/lib/Col';

export default styled(Col)`
  color: ${p => (p.theme.colors.white)};
  margin-left: auto;
  font-family: ${p => p.theme.fontFamily};
  margin-right: auto;
  max-width: 54%;
`;
