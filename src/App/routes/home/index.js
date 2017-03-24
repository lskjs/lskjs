import HomePage from './HomePage';

export default {
  action: ({ ctx }) => {
    return {
      component: <HomePage config={ctx.config} />,
    };
  },
};
