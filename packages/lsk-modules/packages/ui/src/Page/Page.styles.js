import styled from '@emotion/styled'

export default styled('main')`
  width: 100%;
  background-color: ${p => { console.log('ppp', p); return  'red'; p.theme.colors.mainBackground }};
  padding: 4px 8px 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  ${p => (p.dark && `
    background-color: #f0f0f0;
  `)}
  ${p => (p.continuous && `
    flex: 1;
  `)}
`;
