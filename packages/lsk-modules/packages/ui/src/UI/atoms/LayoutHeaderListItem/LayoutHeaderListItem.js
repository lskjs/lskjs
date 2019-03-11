import styled from '@emotion/styled'
import createDynamicTag from '../../../utils/createDynamicTag';

const dynamicTag = createDynamicTag('a');

export default styled(dynamicTag)`
  display: inline-block;
  padding: 0 .875rem;
  font-family: ${p => p.theme.fontFamily};
  margin: 0;
  transition: all .3s;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  
  &:not(:last-child) {
    margin-right: .5rem;
  }

  &:hover {
    background-color: rgba(0,0,0,.05);
  }

  .ant-badge {
    .ant-badge-count {
      font-size: 10px;
      line-heigth: 20px;
      font-weight: 300;
      padding: 0 4px;
    }
  }

  .anticon {
    display: inline-block;
    
    font-size: 1rem;
    line-height: normal;
    padding: 0 4px;
  }
`;
