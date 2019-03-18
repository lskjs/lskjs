import styled from '@emotion/styled';

import { createDynamicTag } from '../../../../utils';

const dynamicTag = createDynamicTag('h4');

export default styled(dynamicTag)`
  margin: 0;
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  font-weight: bold;
  line-height: 1.43;
  letter-spacing: -0.1px;
  text-align: left;
  color: ${p => p.theme.colors.main};
  
  text-decoration: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
