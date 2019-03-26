import React from 'react';

const isDev = () => !!(typeof __DEV__ !== 'undefined' ? __DEV__ : global.__DEV__); // eslint-disable-line

const DEV = ({ children, json, pretty = true }) => ( // eslint-disable-line
  isDev() ? (
    <div style={{ outline: '1px dotted black' }}>
      {json
        ? (
          <pre>
            {pretty
              ? JSON.stringify(json, null, 2)
              // ? JSON.stringify(json, null, 2).replace(/,"/ig, ',\n"')
              : JSON.stringify(json)}
          </pre>
        )
        : children}
    </div>
  ) : null
);

export default DEV;
