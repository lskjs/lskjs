import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Card from 'antd/lib/card';
import PostActions from '../../atoms/PostActions';
import removeProps from '../../../utils/removeProps';

const filteredTag = removeProps(Card, ['withActions']);
export default styled(filteredTag)`
  font-family: ${p => p.theme.fontFamily};
  border-radius: ${p => p.theme.borderRadius};
  
  ${p => (p.withActions && css`
    ${PostActions} {
      transition: opacity .2s ease-out;
      will-change: opacity;
    }
    &:hover {
      ${PostActions} {
        opacity: 1;
      }
    }
  `)}
  
  .ant-card-head {
    border-bottom: none;
    
    .ant-card-head-title,
    .ant-card-extra {
      padding: 16px 0 6px;
    }
  }
`;
