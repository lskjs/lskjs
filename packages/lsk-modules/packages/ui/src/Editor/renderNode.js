import React from 'react';

export default (props, editor, next) => {
  const { attributes, children, node } = props;

  switch (node.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'image': {
      const src = node.data.get('src');
      return <img {...attributes} src={src} />;
    }
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return next();
  }
}
;