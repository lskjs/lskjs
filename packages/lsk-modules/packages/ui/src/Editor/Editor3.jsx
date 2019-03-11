import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash-decorators';
import { isKeyHotkey } from 'is-hotkey';
import { Editor as SlateEditor } from 'slate-react';
import Serializer from 'slate-md-serializer';
import { Value } from 'slate';

import value from './value';
const initialValue = Value.fromJSON(value);


const BoldMark = props => (
  <strong>
    {props.children}
  </strong>
);


const ItalicMark = props => (
  <em property="italic">
    {props.children}
  </em>
);


export default class TextEditor extends Component {
	state = {
	  value: initialValue,
	}

	// On change, update the app's React state with the new editor value.
	onChange = ({ value }) => {
	  this.setState({ value });
	}

	onKeyDown = (e, change) => {
	  /*
			we want all our commands to start with the user pressing ctrl,
			if they don't--we cancel the action.
		*/

	  if (!e.ctrlKey) { return; }
	  e.preventDefault();

	  /* Decide what to do based on the key code... */
	  switch (e.key) {
	    /* When "b" is pressed, add a "bold" mark to the text. */
	    case 'b': {
	      change.toggleMark('bold');
	      return true;
	    }
	    case 'i': {
	      change.toggleMark('italic');
	      return true;
	    }

	    default: {

	    }
	  }
	}

	renderMark = (props) => {
	  switch (props.mark.type) {
	    case 'bold':
	      return <BoldMark {...props} />;

	    case 'italic':
	      return <ItalicMark {...props} />;

	    default: {

	    }
	  }
	}

	render() {
	  return (
  <SlateEditor
    value={this.state.value}
    onChange={this.onChange}
    onKeyDown={this.onKeyDown}
    renderMark={this.renderMark}
  />
	  );
	}
}
