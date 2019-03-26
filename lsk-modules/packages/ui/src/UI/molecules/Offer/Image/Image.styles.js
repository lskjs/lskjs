import styled from '@emotion/styled';

export const Status = styled('div')`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 3px 3px;
  top: 0;
  left: 0;
  z-index: 3;
  opacity: 0;
  text-transform: uppercase;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: 2px;
  text-align: center;
  font-family: ${p => p.theme.fontFamily};

  transition: .2s ease-in-out;
`;

export const Overlay = styled('div')`
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: -1;
`;

export const Block = styled('div')`
  width: 48px;
  height: 48px;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  margin-right: 12px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  ${p => (p.small && `
    width: 40px;
    height: 40px;
  `)}
  ${(p) => {
    switch (p.status) {
      case 'completed':
        return `
          ${Status} {
            opacity: 1;
            background-color: rgba(75, 134, 198, 0.8);
          }
        `;
      case 'pending':
        return `
          ${Status} {
            opacity: 1;
            background-color: rgba(75, 134, 198, 0.8);
          }
        `;
      case 'rejected':
        return `
          ${Status} {
            opacity: 1;
            background-color: rgba(218, 76, 90, 0.8);
          }
        `;
      case 'closed':
        return `
          ${Status} {
            opacity: 1;
            background-color: rgba(74, 74, 74, 0.8);
          }
        `;
      default:
        return '';
    }
  }}
`;
