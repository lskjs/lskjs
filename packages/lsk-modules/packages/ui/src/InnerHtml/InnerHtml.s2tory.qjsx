import React from 'react';
import InnerHtml from './InnerHtml';

module.exports = function ({ storiesOf, action, knob }) {
  return storiesOf('InnerHtml', module)
    .add('--example', () => (
      <InnerHtml
        type={knob.text('type=text/md', 'md')}
        children={knob.text('children', '# Demo Title\n Demo text')}
      />
    ))
    .add('text', () => (
      <InnerHtml>
        Demo text Demo text Demo text Demo text Demo text Demo text
      </InnerHtml>
    ))
    .add('demo 0', () => (
      <InnerHtml type="md">
# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

    Demo text
    Demo text
    Demo text


---


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'
      </InnerHtml>
    ))
    .add('demo 1', () => (
      <InnerHtml type="md">
        {require('raw!./demo.md')}
      </InnerHtml>
    ));
};
