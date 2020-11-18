export type AppProps = {
  _module: string | null;
  app: AppProps | null;
  parent: AppProps | null;
};

export default (target: object, ...arrayAppOrProps: AppProps[]): void => {
  let props: AppProps;
  arrayAppOrProps.forEach((appOrProps) => {
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
      props = {
        ...props,
        ...appOrProps,
      };
    }
  });
  Object.assign(target, props);
};
