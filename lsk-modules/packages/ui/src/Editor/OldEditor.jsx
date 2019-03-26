import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash-decorators';
import { isKeyHotkey } from 'is-hotkey';
import { Editor as SlateEditor } from 'slate-react';
import Serializer from 'slate-md-serializer';
import { Value } from 'slate';

import FormatBold from 'react-icons2/mdi/format-bold';
import FormatItalic from 'react-icons2/mdi/format-italic';
import FormatUnderline from 'react-icons2/mdi/format-underline';
// import FormatCode from 'react-icons2/mdi/code-tags';
// import FormatHeader1 from 'react-icons2/mdi/format-header-1';
// import FormatHeader2 from 'react-icons2/mdi/format-header-2';
// import FormatQuote from 'react-icons2/md/format-quote';
// import FormatListNumbered from 'react-icons2/mdi/format-list-numbers';
import FormatListBulleted from 'react-icons2/mdi/format-list-bulleted';

/**
 * Define the default node type.
 *
 * @type {String}
 */

const DEFAULT_NODE = 'paragraph';

/**
 * Define hotkey matchers.
 *
 * @type {Function}
 */

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const defaultSchema = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [],
      },
    ],
  },
};

/**
 * The rich text example.
 *
 * @type {Component}
 */

class Editor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    value: '',
    placeholder: null,
    onChange: null,
  }

  constructor(props) {
    super(props);
    this.serializer = new Serializer();

    /**
     * Deserialize the initial editor value.
     *
     * @type {Object}
     */

    this.state = {
      value: this.prepareValueToState(props.value),
    };
  }

  componentWillReceiveProps(next) {
    if (this.props.value !== next.value) {
      this.setState({
        value: this.prepareValueToState(next.value),
      });
    }
  }

  /**
   * On change, save the new `value`.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value }, this.callback);
  }

  /**
   * On key down, if it's a formatting command toggle a mark.
   *
   * @param {Event} event
   * @param {Change} change
   * @return {Change}
   */

  onKeyDown = (event, change) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true; // eslint-disable-line
  }

  /**
   * When a mark button is clicked, toggle the current mark.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  }

  /**
   * When a block button is clicked, toggle the block type.
   *
   * @param {Event} event
   * @param {String} type
   */

  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'ordered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        change
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('ordered-list');
      } else {
        change.setBlock(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        change
          .setBlock(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('ordered-list');
      } else if (isList) {
        change
          .unwrapBlock(type === 'bulleted-list' ? 'ordered-list' : 'bulleted-list')
          .wrapBlock(type);
      } else {
        change.setBlock('list-item').wrapBlock(type);
      }
    }

    this.onChange(change);
  }

  prepareValueToState = (value) => {
    if (value.length > 0) {
      return this.serializer.deserialize(value);
    }
    return Value.fromJSON(defaultSchema);
  }

  @debounce(300)
  callback = () => {
    const { value } = this.state;
    const { onChange } = this.props;
    const mdValue = this.serializer.serialize(value);
    if (onChange) onChange(mdValue);
  }

  /**
   * Check if the current selection has a mark with `type` in it.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasMark = (type) => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  }

  /**
   * Check if the any of the currently selected blocks are of `type`.
   *
   * @param {String} type
   * @return {Boolean}
   */

  hasBlock = (type) => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  }

  /**
   * Render the toolbar.
   *
   * @return {Element}
   */

  renderToolbar = () => {
    return (
      <div className="slate-menu toolbar-menu">
        {this.renderMarkButton('bold', <FormatBold />)}
        {this.renderMarkButton('italic', <FormatItalic />)}
        {this.renderMarkButton('underlined', <FormatUnderline />)}
        {/* {this.renderMarkButton('code', <FormatCode />)} */}
        {/* {this.renderBlockButton('heading1', <FormatHeader1 />)} */}
        {/* {this.renderBlockButton('heading2', <FormatHeader2 />)} */}
        {/* {this.renderBlockButton('block-quote', <FormatQuote />)} */}
        {/* {this.renderBlockButton('ordered-list', <FormatListNumbered />)} */}
        {this.renderBlockButton('bulleted-list', <FormatListBulleted />)}
      </div>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);
    const onMouseDown = event => this.onClickMark(event, type);
    /* eslint-disable */
    return (
      <span
        className="toolbar-button"
        onMouseDown={onMouseDown}
        data-active={isActive}
      >
        <span className="material-icon">{icon}</span>
      </span>
    );
    /* eslint-enable */
  }

  /**
   * Render a block-toggling toolbar button.
   *
   * @param {String} type
   * @param {String} icon
   * @return {Element}
   */

  renderBlockButton = (type, icon) => {
    const isActive = this.hasBlock(type);
    const onMouseDown = event => this.onClickBlock(event, type);
    /* eslint-disable */
    return (
      <span
        className="toolbar-button"
        onMouseDown={onMouseDown}
        data-active={isActive}
      >
        <span className="material-icon">{icon}</span>
      </span>
    );
    /* eslint-enable */
  }

  /**
   * Render the Slate editor.
   *
   * @return {Element}
   */

  renderEditor = () => {
    return (
      <div className="slate-editor">
        <SlateEditor
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
          spellCheck
        />
      </div>
    );
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  /* eslint-disable */
  renderNode = (props) => {
    const { attributes, children, node } = props;
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading1':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading2':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'ordered-list':
        return <ol {...attributes}>{children}</ol>;
    }
  }

  /**
   * Render a Slate mark.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderMark = (props) => {
    const { children, mark } = props;
    switch (mark.type) {
      case 'bold':
        return <strong>{children}</strong>;
      case 'code':
        return <code>{children}</code>;
      case 'italic':
        return <em>{children}</em>;
      case 'underlined':
        return <u>{children}</u>;
    }
  }
  /* eslint-enable */

  /**
   * Render.
   *
   * @return {Element}
  */

  render() {
    return (
      <div className="slate-wrapper" style={{ marginTop: 12 }}>
        {this.renderToolbar()}
        {this.renderEditor()}
      </div>
    );
  }
}

/**
 * Export.
 */

export default Editor;
