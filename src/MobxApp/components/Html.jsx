import React, { PropTypes } from 'react';

function Html({ title, description, style, script, children, initialState }) {
  return (
    <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <style id="css" dangerouslySetInnerHTML={{ __html: style }} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}`}}/>
        {script && <script src={script} />}
      </body>
    </html>
  );
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
};

export default Html;
