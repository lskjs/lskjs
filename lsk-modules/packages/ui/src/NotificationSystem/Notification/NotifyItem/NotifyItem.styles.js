import styled from '@emotion/styled';

export const Left = styled('div')`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-right: 10px;
`;

export const Right = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const Item = styled('div')`
  padding: 16px 32px 16px 8px;
  transition: .3s ease;
  will-change: opacity;
  cursor: pointer;
  display: flex;
  /* width: 100%; */
  border-radius: 8px;
  line-height: 1.2;
  text-decoration: none;
  align-items: flex-start;
  font-family: ${p => p.theme.fontFamily};
 
  * {
    color: ${p => p.theme.colors.white} !important;
  }

  &:hover {
    text-decoration: none;
  }
  &:focus {
    text-decoration: none
  }
  &:active {
    text-decoration: none;
  }
  ${(p) => {
    switch (p.type) {
      case 'error':
        return `
          background-color: #ee1e31 !important;
          color: white !important;
          &:hover {
            background-color: #ee1e31 !important;
            box-shadow: none !important;
            cursor: pointer !important;
            text-decoration: none !important;
          }
        `;
      case 'warning':
        return `
          background-color: #fe9902 !important;
          color: white !important;
          &:hover {
            background-color: #fe9902 !important;
            box-shadow: none !important;
            cursor: pointer !important;
            text-decoration: none !important;
          }
        `;
      case 'success':
        return `
          background-color: #50cc58 !important;
          color: white !important;
          &:hover {
            background-color: #50cc58 !important;
            box-shadow: none !important;
            cursor: pointer !important;
            text-decoration: none !important;
          }
        `;
      case 'info':
        return `
          background-color: #7070ff !important;
          color: white !important;
          &:hover {
            background-color: #7070ff !important;
            box-shadow: none !important;
            cursor: pointer !important;
            text-decoration: none !important;
          }
        `;
      default: return '';
    }
  }}
  ${p => (p.unread && `
    background-color: #ddebf9;
  `)}
  
`;

