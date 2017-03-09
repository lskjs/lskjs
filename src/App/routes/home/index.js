import HomePage from './HomePage';

export default {
  action: ({ ctx }) => {
    return {
      component: <HomePage siteTitle={ctx.config.siteTitle} />,
    };
  },
};
