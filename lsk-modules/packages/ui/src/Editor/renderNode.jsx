import React from 'react';

export default (props, editor, next) => {
  const { attributes, children, node } = props;
  console.log('node', node, children, node.text);
  switch (node.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'code':
      return <code {...attributes}>{children}</code>;
    case 'image': {
      const src = node.data.get('src');
      const alt = node.data.get('alt');
      const title = node.data.get('title');
      return <img {...attributes} alt={alt} src={src} title={title} />;
    }
    case 'link': {
      const href = node.data.get('href');
      const title = node.data.get('title');
      return <a {...attributes} href={href} title={title}>{children}</a>;
    }
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'heading1':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading2':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading3':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading4':
      return <h4 {...attributes}>{children}</h4>;
    case 'heading5':
      return <h5 {...attributes}>{children}</h5>;
    case 'heading6':
      return <h6 {...attributes}>{children}</h6>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'ordered-list':
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'horizontal-rule':
      return <hr />;
    case 'table':
      return <table {...attributes}>{children}</table>;
    case 'table-row':
      return <tr {...attributes}>{children}</tr>;
    case 'table-head': {
      const align = node.data.get('align');
      return <th {...attributes} align={align}>{children}</th>;
    }
    case 'table-cell': {
      const align = node.data.get('align');
      return <td {...attributes} align={align}>{children}</td>;
    }
    default:
      return next();
  }
};
