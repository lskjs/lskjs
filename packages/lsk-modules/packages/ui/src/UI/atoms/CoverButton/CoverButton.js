import styled from '@emotion/styled'
import BsButton from 'antd/lib/button';

export default styled(BsButton)`
  height: auto;
  padding: .6em 3.5em;
  text-transform: uppercase;
  letter-spacing: .5px;
  line-height: 2;
  font-family: ${p => p.theme.fontFamily};
  font-size: .75rem;
`;
