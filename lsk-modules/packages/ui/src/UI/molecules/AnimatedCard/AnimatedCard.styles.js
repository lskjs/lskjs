import styled from '@emotion/styled';
import createDynamicTag from '../../../utils/createDynamicTag';
import removeProps from '../../../utils/removeProps';


const dynamicTag = createDynamicTag('div');
const filteredTag = removeProps(dynamicTag, [
  'paint',
]);

export const Block = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  padding: 20px;
  height: 50px;
  background-color: ${p => (p.paint ? p.paint : p.theme.colors.primary)};
  opacity: 0;
  transition: all .35s ease-in-out;
`;


export const InfoMask = styled('div')`
  content: "";
  position: absolute;
  height: 100%;
  background-color: ${p => (p.paint ? p.paint : p.theme.colors.primary)};
  left: 0;
  right: 0;
  padding-bottom: 100%;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: all .6s cubic-bezier(.4,0,.2,1);
`;

export const InfoContent = styled('div')`
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: scale(.5);
  transition: all .3s ease;
`;

export const ACard = styled(filteredTag)`
  border: 1px solid #eaeaea;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
  transition: all .35s ease-in-out;
  ${(p) => {
    switch (p.variant) {
      case 'circle': return `
        &:hover {
          ${InfoMask} {
            opacity: .8;
            transform: scaleX(2.21);
          }
          ${InfoContent} {
            opacity: 1;
            transform: scale(1);
          }
        }`;
      case 'top': return `
        ${Block} {
          transform: translateY(-100%);
          bottom: auto;
        }
        &:hover {
          ${Block} {
            transform: translateY(0);
            visibility: visible;
            opacity: 1;
          }
        }`;
      case 'bottom': return `
        ${Block} {
          transform: translateY(100%);
          top: auto;
        }
        &:hover {
          ${Block} {
            transform: translateY(0);
            visibility: visible;
            opacity: 1;
          }
        }`;
      default: return '';
    }
  }}
 
`;


export const Info = styled('div')`
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;


export const InfoInner = styled('div')`
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  text-align: center;
  color: #fff;
`;

