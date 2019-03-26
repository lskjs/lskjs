import React from 'react';

export default () => (
  <svg
    width="130px"
    height="130px"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className="lds-double-ring"
    style={{ background: 'none' }}
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      strokeLinecap="round"
      r="30"
      strokeWidth="5"
      stroke="#cece92"
      strokeDasharray="47.12388980384689 47.12388980384689"
      transform="rotate(146.937 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="2s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      cx="50"
      cy="50"
      fill="none"
      strokeLinecap="round"
      r="24"
      strokeWidth="5"
      stroke="#0b0b0b"
      strokeDasharray="37.69911184307752 37.69911184307752"
      strokeDashoffset="37.69911184307752"
      transform="rotate(-146.937 50 50)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;-360 50 50"
        keyTimes="0;1"
        dur="2s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);
