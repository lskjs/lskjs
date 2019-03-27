import React from 'react';

if (module.hot || process.env.NODE_ENV !== 'production') {
  module.exports = {
    Redbox: require('redbox-react').default,
    // deepForceUpdate: require('react-deep-force-update'),
  };
} else {
  // const root =
  module.exports = {
    Redbox: ({ error }) => React.createElement('pre', {}, JSON.stringify(error)),
  };
}
