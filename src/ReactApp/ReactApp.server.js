// import ssr from './ssr'
import ReactDOM from 'react-dom/server';
import UniversalRouter from 'universal-router';

import { createMemoryHistory } from 'history';
import CoreApp from 'lego-starter-kit/CoreApp'
import assets from './assets'; // eslint-disable-line import/no-unresolved
import routes from './routes';
import React, { Component, PropTypes } from 'react'
import AppWrapper from './AppWrapper'
import Html from './Html'
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
    return new Html(props).render()
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

  applyUniversalRouter(routes, params) {
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
        const htmlProps = Object.assign({}, params, routeProps)
        const rootComponent = this.appComponent({...htmlProps, context, req})
        // console.log('before renderToStaticMarkup', htmlProps, rootComponent);
        try {
          const rootComponentString =  ReactDOM.renderToStaticMarkup(rootComponent);
          // console.log('rootComponentString', rootComponentString);
          htmlProps.children = rootComponentString
        } catch (err) {
          console.log('ReactApp renderToStaticMarkup error');
          console.log(err);
          htmlProps.children = JSON.stringify(err)
        }

        htmlProps.style = css.join(' ')
        htmlProps.htmlClass = this.getRenderHtmlClass(req)
        res.status(htmlProps.status || 200).send(this.renderHtml(htmlProps))
      } catch (err) {
        console.log('err', err)
        next(err);
      }
    }
  }
}
