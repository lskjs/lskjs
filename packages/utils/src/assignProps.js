export default (target, appOrProps = {}) => {
  let props = {};
  if (appOrProps && appOrProps._module) {
    if (appOrProps._module === 'app') {
      props.app = appOrProps;
    } else {
      props.parent = appOrProps;
      if (props.parent && props.parent.app && props.parent._module === 'app') {
        props.app = props.parent.app;
      }
    }
  } else {
    props = appOrProps;
  }
  Object.assign(target, props);
};
