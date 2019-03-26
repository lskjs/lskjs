import styled from '@emotion/styled';

export const Value = styled('div')`
  margin-top: -6px;
  font-weight: 500;
  font-size: 14px;
  margin-right: 12px;
  font-family: ${p => p.theme.fontFamily};
  color: ${p => p.theme.colors.primary};
`;

export const SliderWrapper = styled('div')`
  width: 100%;
  .ant-slider .ant-slider-track {
    background-color: ${p => p.theme.colors.primary};
  }
  .ant-slider .ant-slider-handle {
    border: solid 2px ${p => p.theme.colors.primary};
  }
`;

export const Wrapper = styled('div')`
   display: flex;
  .ant-slider {
    margin: 10px 0px 10px 6px;
    height: 10px;
    background-color: transparent !important;
    border-top: none !important;
    border-bottom: none !important;
  }
  
  .ant-slider:hover {
    background-color: transparent !important;
  }
  
  .ant-slider-rail {
    height: 2px !important;
    background-color: #eeeff4 !important;
    top: 0 !important;
  }
  
  .ant-slider-track {
    height: 2px !important;
    background-color: ${p => p.theme.colors.primary} !important;
    top: 0 !important;
  }
  
  .ant-slider-step {
    height: 2px !important;
    top: 0 !important;
  }
  
  .ant-slider-handle {
   margin-top: -5px !important;
   width: 8px !important;
   height: 8px !important;
   border: none !important;
   background-color: #7070ff !important;
   outline: none !important;
   box-shadow: 0 0 0 1px ${p => p.theme.colors.primary};
  
   transition: box-shadow .2s ease-out !important;
   will-change: box-shadow;
  }
  
  .ant-slider-handle:hover {
   box-shadow: 0 0 0 6px ${p => p.theme.colors.primary};
   transform: scale(1) !important;
  }
  
  .ant-slider-disabled .ant-slider-rail {
    background-color: #e9e9e9 !important;
  }
  
  .ant-slider-disabled .ant-slider-handle {
    background-color: #efefef !important;
  }
  
  .ant-slider-mark {
    top: auto !important;
    bottom: 22px !important;
    left: -6px !important;
    width: calc(100% + 6px) !important;
  
    display: flex;
    justify-content: space-between;
  }
  
  .ant-slider-mark-text {
    font-size: 12px;
    font-weight: 500;
    font-family: 'Gotham Pro', Helvetica, Arial;
    letter-spacing: -0.1px;
    color: rgba(155, 155, 155, 0.5) !important;
  
    width: auto !important;
    margin-left: 0 !important;
    position: relative !important;
    left: auto !important;
  }
  
  .ant-slider-mark-text-active {
    color: ${p => p.theme.colors.primary} !important;
  }
  
  .ant-slider-dot {
    display: none;
    top: -1px !important;
    width: 4px !important;
    height: 4px !important;
    border: none !important;
    background-color: rgba(75, 134, 198, 0.5) !important;
  }
  
  .ant-slider-dot-active {
    background-color: ${p => p.theme.colors.primary} !important;
  }
`;
