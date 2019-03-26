import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { markdown } from 'markdown'
import MarkdownIt from 'markdown-it';
import MarkdownItEmoji from 'markdown-it-emoji';
import hljs from 'highlight.js';

const md = (new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`;
      } catch (err) {
        console.log(err);
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
}))
  .use(MarkdownItEmoji);

// const demo = require('raw!./demo.md');
// function mdToHtml(str) {
//   return markdown.toHTML(str)
// }

function getHtml(obj = '', type) {
  // return md.render(demo);
  if (obj === null) obj = '';
  if (type === 'md') return md.render(obj);
  if (obj.__md) return md.render(obj.__md);
  if (typeof obj === 'string') {
    if (obj.substr(0, 3) === '@md') {
      return md.render(obj.substr(3));
    }
    if (obj.substr(0, 4) === '#!md') {
      return md.render(obj.substr(4));
    }
    return obj;
  }
  return 'HZ ???';
}

export default class InnerHtml extends Component {
  static defaultProps = {
    type: null,
    content: null,
    children: null,
  }
  static propTypes = {
    type: PropTypes.string,
    content: PropTypes.any,
    children: PropTypes.any,
  }
  render() {
    const { content: cnt, children, type } = this.props;
    const content = cnt || children;
    return (
      <div
        className="InnerHtml"
        dangerouslySetInnerHTML={{ __html: getHtml(content, type) }}
      />
    );
  }
}
