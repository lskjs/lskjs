import styled from '@emotion/styled'
import Layout from 'antd/lib/layout';
import LayoutFooterElement from '../LayoutFooterElement';

const { Footer } = Layout;

export default styled(Footer)`
  line-height: 1.25rem;
  font-family: ${p => p.theme.fontFamily};
  padding: 1.625rem 30px;

  a {
    color: ${p => p.theme.colors.darkGray};
    opacity: .6;

    &:hover {
      opacity: .87;
    }
  }

  ul {
    margin: 0;
  }
  
  padding: 11px 30px 12px;
  border-top: 1px solid rgba(0,0,0, .05);
  background-color: rgba(0,0,0, .01);

  ${LayoutFooterElement}:not(:last-child) {
    position: relative;
    padding-right: .5rem;
    margin-right: .5rem;
    &:after {
      content: '';
      position: absolute;
      background-color: ${p => `rgba(${p.theme.colors.black}, .2)`};
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      margin-top: -5px;
      height: 10px;
    }

    @media screen and (min-width: 768px) {
      padding-right: 0;
      margin-right: 0;
      &:after {
        content: normal;
      }
    }
  }
`;
