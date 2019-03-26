import styled from '@emotion/styled';

export default styled('div')`
    display: flex;
    flex-direction: column;
    margin: 8px;

    width: 280px;
    ${p => (p.half && `
      width: 0%;
      flex-grow: 1;
    `)}
    ${p => (p.mini && `
      width: 168px;
    `)}
    ${p => (p.double && `
      width: 428px;
    `)}
    ${p => (p.full && `
      width: 100%;
    `)}
    ${p => (p.auto && `
      width: auto;
      flex: 1;
    `)}
    ${p => (p.noFlex && `
      flex: 0 !important;
    `)}
    ${p => (p.half && p.grid && `
      flex-basis: 45%;
    `)}
`;
