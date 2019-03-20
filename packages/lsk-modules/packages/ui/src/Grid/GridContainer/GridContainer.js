import styled from '@emotion/styled';
import { css } from '@emotion/core';
import removeProps from '../../utils/removeProps';

const filter = removeProps('div', ['fluid']);
export default styled(filter)`
    box-sizing: border-box;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media print {
      min-width: 992px !important;
    }
    ${p => (!p.fluid && css`
      @media (min-width: 576px) {
        max-width: 540px;
      }
      @media (min-width: 768px) {
        max-width: 720px;
      }
      @media (min-width: 992px) {
        max-width: 960px;
      }
      @media (min-width: 1200px) {
        max-width: 1140px;
      }
    `)}
`;
