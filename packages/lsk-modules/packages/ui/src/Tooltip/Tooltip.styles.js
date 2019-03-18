import styled from '@emotion/styled';

// import { createDynamicTag } from '../utils/createDynamicTag';

// const dynamicTag = createDynamicTag('span');

// export default styled(dynamicTag)`
//   font-family: ${p => p.theme.fontFamily};
//   font-size: 13px;
//   line-height: 1.43;
//   text-align: left;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ${p => (p.disabled && `
//     opacity: .5 !important;
//     cursor: not-allowed !important;
//   `)}
// `;
const Block = styled('span')`
  font-family: ${p => p.theme.fontFamily};
  font-size: 13px;
  line-height: 1.43;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  ${p => (p.disabled && `
    opacity: .5 !important;
    cursor: not-allowed !important;
  `)}
`;

export default Block;
