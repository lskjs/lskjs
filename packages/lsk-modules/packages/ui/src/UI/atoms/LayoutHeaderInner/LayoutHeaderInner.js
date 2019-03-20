import styled from '@emotion/styled';

export default styled('div')`
  display: flex;
  line-height: 60px;
  font-family: ${p => p.theme.fontFamily};
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  background-color: ${p => p.theme.colors.white};
  a {
    color: ${p => p.theme.colors.darkGray};
    &:hover {
      color: ${p => p.theme.colors.darkGray};
    }
  }
  
  .ant-divider-vertical {
    background: rgba(222,222,222, .5);
    top: -2.5px;
  }
  
  .ant-menu-horizontal {
    line-height: 58px;
    border-color: transparent;
  }
  
  .anticon {
    display: inline-block;
  }

  /* .logo-img {
    float: left; // fix its position affect other list items
    margin: 18px 15px 0; // ($l_header_height - height) / 2 = (60 - 24)/2
  }

  .header-right {
    padding-right: 5px;
  }

  .header-icon {
    display: inline-block;
    height: $l_header_height;
    line-height: $l_header_height;
    padding: 0 14px;
    @media only screen and (min-width: $l_screen_md_min) {
      padding: 0 18px;
    }
  }

  a.list-inline-item {
    &:hover {
      background-color: rgba(0,0,0,.05);
    }
  }
  .list-inline-item {
    padding: 0 .875rem;
    margin: 0;
    transition: all .3s;

    .ant-badge {
      .ant-badge-count {
        font-size: 10px;
        line-heigth: 20px;
        font-weight: $font-weight-light;
        padding: 0 4px;
      }
    }

    // apply to .list-inline-item icon only
    .list-icon {
      font-size: 1rem;
      line-height: $l_header_height;;
      padding: 0 4px;
    }
    .list-icon-v2 { // with no line-height, for alignment issue
      font-size: 1rem;
      padding: 0 4px;
    }
    .list-notification-icon {
      font-size: 1rem;
      padding: 4px;
    }

    .avatar-text {
      margin-left: .5rem;
    }
  } */
`;
