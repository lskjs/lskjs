// import ssr from './ssr'
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';

import { createMemoryHistory } from 'history';
import CoreApp from 'lego-starter-kit/CoreApp'
import assets from './assets'; // eslint-disable-line import/no-unresolved
import routes from './routes';
import React, { Component, PropTypes } from 'react'
import AppWrapper from './AppWrapper'
import useragent from 'useragent'
import _ from 'lodash'

export default class ReactApp extends CoreApp {

  getAssets() {
    return assets.main
  }

  useDefaultRoute() {
    this.app.get('*', this.applyUniversalRouter(
      this.getUniversalRoutes(),
      { assets: this.getAssets() }
    ))
  }

  getRenderHtmlClass(req) {
    const ua = useragent.is(req.headers['user-agent'])
    ua.js = false
    return _.map(ua, (val, key) => `ua_${key}_${val ? 'yes' : 'no'}`).join(' ')
  }

  renderHtml(props = {}) {
    // data-initial-state={props.state}
    return `
      <!doctype html>
      <html className="${props.htmlClass || ''}" lang="${props.lang || ''}">
        <head>
          <title>${props.title}</title>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="apple-touch-icon.png" />
          ${props.fontFamily && `<link rel="stylesheet" href="//fonts.googleapis.com/css?family=${props.fontFamily}" />` || ''}
          <style id="css">${props.style || ''}</style>
          ${props.headerHtml || ''}
        </head>
        <body>
          <!-- ${JSON.stringify(props)} -->
          <div id="app"/>
            ${props.children || ''}
          </div>
          ${props.assets && props.assets.js && (
            `<script
              id="js"
              src="${props.assets.js}"
              data-initial-state="${JSON.stringify(props.initialState) || '{}'}"
            ></script>`
          ) || ''}
          ${props.footerHtml || ''}
        </body>
      </html>
    `
  }

  getUniversalRoutes() {
    return routes
  }

  getMainJs() {
    return assets.main.js
  }

  appComponent({ component, context }) {
    return <AppWrapper context={context} children={component} />
  }

  applyUniversalRouter(routes, props) {
    return async (req, res, next) => {
      // console.log('applyUniversalRouter');
      try {
        const css = []
        const context = {
          history: createMemoryHistory({
            initialEntries: [req.url],
          }),
          insertCss: (...styles) => {
            styles.forEach(style => css.push(style._getCss()));
          },
        }
        // console.log('before UniversalRouter');

        const routeProps = await UniversalRouter.resolve(routes, req)
        // console.log('after UniversalRouter');
        // console.log('route', route);
        // const data = { ...route }
        const htmlProps = Object.assign({}, props, routeProps)
        const rootComponent = this.appComponent({...htmlProps, context, req})
        // console.log('before renderToStaticMarkup', htmlProps, rootComponent);
        try {
          const rootComponentString =  ReactDOM.renderToStaticMarkup(rootComponent);
          // console.log('rootComponentString', rootComponentString);
          htmlProps.children = rootComponentString
        } catch (err) {
          console.log('catchcatchcatchcatchcatchcatchcatch');
          console.log(err);
        }

        htmlProps.htmlClass = this.getRenderHtmlClass(req)
        res.status(htmlProps.status || 200).send(this.renderHtml(htmlProps))
      } catch (err) {
        console.log('err', err)
        next(err);
      }
    }
  }
}
