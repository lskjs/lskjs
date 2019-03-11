import styled from '@emotion/styled'

export default styled('div')`
  .ant-tabs-nav .ant-tabs-tab {
    padding: 1rem;
  }

  .ant-tabs-bar {
    margin-bottom: .25rem;
  }

  .ant-list-item {
    padding: .75rem 1.5rem;
    transition: background-color .2s;
    &:hover {
      background-color: ${p => `rgba(${p.theme.colors.info}, .08)`};
      cursor: pointer;
    }
  }

  .ant-list-footer {
    padding: 0;

    a {
      display: block;
      padding: .75rem;
      text-align: center;
      color: rgba(0, 0, 0, 0.65);
      transition: all .2s;

      &:hover {
        color: ${p => p.theme.colors.darkGray};
        background-color: ${p => `rgba(${p.theme.colors.darkGray}, .03)`};
      }
    }
  }
`;
