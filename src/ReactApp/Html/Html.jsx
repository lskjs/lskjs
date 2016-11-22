import React, { PropTypes } from 'react';


function getHeadHtml({ style, helmet, fontFamily }) {
  fontFamily = fontFamily || 'Baloo+Bhai|Roboto:300,400,500,700&subset=cyrillic';

  return (`
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=${fontFamily}" />
    <style id="css">${style || ''}</style>
    ${helmet || ''}
  `);
}

function Html(props) {
  const { lang, style, helmet, children, script, state } = props
  return (
    <html className="no-js" lang={lang}>
      <head dangerouslySetInnerHTML={{ __html: getHeadHtml(props) }} />
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: children }} />
        {script && state && (
          <script
            id="source"
            src={script}
            data-initial-state={state}
          />
        )}
        {/*{analytics.google.trackingId &&
          <script
            dangerouslySetInnerHTML={{ __html:
            'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
            `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')` }}
          />
        }
        {analytics.google.trackingId &&
          <script src="//www.google-analytics.com/analytics.js" async="true" defer="true" />
        }*/}
      </body>
    </html>
  );
}

Html.propTypes = {
  lang: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  helmet: PropTypes.string.isRequired,
  script: PropTypes.string,
  state: PropTypes.string,
  children: PropTypes.string,
};

export default Html;
