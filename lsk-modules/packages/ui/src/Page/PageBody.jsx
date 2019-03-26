import React, { PureComponent } from 'react';

class PageBody extends PureComponent {
  render() {
    const { children, ...props } = this.props;
    return (
      <div {...props}>
        {children}
      </div>
    );
  }
}

export default PageBody;
