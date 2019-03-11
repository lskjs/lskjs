import styled from '@emotion/styled'

export const LeftWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const RightWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

export const InputBox = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  ${p => (p.leftIcon !== null && `
    > ${LeftWrapper} {
      position: absolute;
      margin-left: 8px;
      left: 0;
    }
  `)}
   ${p => (p.rightIcon !== null && `
    > ${RightWrapper} {
      position: absolute;
      margin-right: 8px !important;
      right: 0 !important;
    }
  `)}
`;
