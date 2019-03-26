import React from 'react';

const DefaultLoader = () => (
  <svg
    width="60px"
    height="60px"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className="lds-ripple"
    style={{ background: 'none' }}
  >
    <circle
      cx="50"
      cy="50"
      r="31.8911"
      fill="none"
      stroke="#b5ccf1"
      strokeWidth="5"
    >
      <animate
        attributeName="r"
        calcMode="spline"
        values="0;40"
        keyTimes="0;1"
        dur="1"
        keySplines="0 0.2 0.8 1"
        begin="-0.5s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        calcMode="spline"
        values="1;0"
        keyTimes="0;1"
        dur="1"
        keySplines="0.2 0 0.8 1"
        begin="-0.5s"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      cx="50"
      cy="50"
      r="11.6334"
      fill="none"
      stroke="#94a9ce"
      strokeWidth="5"
    >
      <animate
        attributeName="r"
        calcMode="spline"
        values="0;40"
        keyTimes="0;1"
        dur="1"
        keySplines="0 0.2 0.8 1"
        begin="0s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        calcMode="spline"
        values="1;0"
        keyTimes="0;1"
        dur="1"
        keySplines="0.2 0 0.8 1"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default DefaultLoader;
