import { css } from 'emotion'

export default css`
  max-width: 300px;
  @media screen and (min-width: 768px) {
    max-width: none;
  }

  .ant-popover-inner-content {
    padding: 0;
  }
`;
