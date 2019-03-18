import React from 'react';
import cx from 'classnames';

const withResponsive = Button => ({
  icon, className, children, ...props
}) => (
  <React.Fragment>
    <Button
      {...props}
      iconLeft={icon}
      className={cx(className, 'd-none d-md-flex')}
    >
      {children}
    </Button>
    <Button
      {...props}
      icon={icon}
      className={cx(className, 'd-md-none')}
    />
  </React.Fragment>
);

export default withResponsive;
