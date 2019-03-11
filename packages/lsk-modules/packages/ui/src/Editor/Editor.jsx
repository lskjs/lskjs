import React, { Component } from 'react';
import { Editor } from 'slate-react';
import Prism from 'prismjs';
import renderMark from './renderMark';
import renderNode from './renderNode';

// @debounce(300)
// callback = () => {
//   const { value } = this.state;
//   const { onChange } = this.props;
//   const mdValue = serializer.serialize(value);
//   if (onChange) onChange(mdValue);
// }


class MarkdownPreview extends Component {
  render() {
    const { initialValue, ...props } = this.props;
    console.log('initialValue', initialValue.toJSON());
    
    return (
      <Editor
        defaultValue={initialValue}
        renderMark={renderMark}
        renderNode={renderNode}
        // decorateNode={this.decorateNode}
        {...props}
      />
    );
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @param {Editor} editor
   * @param {Function} next
   * @return {Element}
   */

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;

      case 'code':
        return <code {...attributes}>{children}</code>;

      case 'italic':
        return <em {...attributes}>{children}</em>;

      case 'underlined':
        return <u {...attributes}>{children}</u>;

      case 'title': {
        return (
          <span
            {...attributes}
            style={{
              fontWeight: 'bold',
              fontSize: '20px',
              margin: '20px 0 10px 0',
              display: 'inline-block',
            }}
          >
            {children}
          </span>
        );
      }

      case 'punctuation': {
        return (
          <span {...attributes} style={{ opacity: 0.2 }}>
            {children}
          </span>
        );
      }

      case 'list': {
        return (
          <span
            {...attributes}
            style={{
              paddingLeft: '10px',
              lineHeight: '10px',
              fontSize: '20px',
            }}
          >
            {children}
          </span>
        );
      }

      case 'hr': {
        return (
          <span
            {...attributes}
            style={{
              borderBottom: '2px solid #000',
              display: 'block',
              opacity: 0.2,
            }}
          >
            {children}
          </span>
        );
      }

      default: {
        return next();
      }
    }
  }

  /**
   * Define a decorator for markdown styles.
   *
   * @param {Node} node
   * @param {Function} next
   * @return {Array}
   */

  decorateNode(node, editor, next) {
    const others = next() || [];
    if (node.object != 'block') return others;

    const string = node.text;
    const texts = node.getTexts().toArray();
    const grammar = Prism.languages.markdown;
    const tokens = Prism.tokenize(string, grammar);
    const decorations = [];
    let startText = texts.shift();
    let endText = startText;
    let startOffset = 0;
    let endOffset = 0;
    let start = 0;

    function getLength(token) {
      if (typeof token === 'string') {
        return token.length;
      } else if (typeof token.content === 'string') {
        return token.content.length;
      }
      return token.content.reduce((l, t) => l + getLength(t), 0);
    }

    for (const token of tokens) {
      startText = endText;
      startOffset = endOffset;

      const length = getLength(token);
      const end = start + length;

      let available = startText.text.length - startOffset;
      let remaining = length;

      endOffset = startOffset + remaining;

      while (available < remaining) {
        endText = texts.shift();
        remaining = length - available;
        available = endText.text.length;
        endOffset = remaining;
      }

      if (typeof token !== 'string') {
        const dec = {
          anchor: {
            key: startText.key,
            offset: startOffset,
          },
          focus: {
            key: endText.key,
            offset: endOffset,
          },
          mark: {
            type: token.type,
          },
        };

        decorations.push(dec);
      }

      start = end;
    }

    return [...others, ...decorations];
  }
}

/**
 * Export.
 */

export default MarkdownPreview;
