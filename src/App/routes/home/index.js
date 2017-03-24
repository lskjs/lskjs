import HomePage from './HomePage';

export default {
  action: ({ page }) => {
    return page
      .pushTitle('Главная')
      .component(HomePage, {});
  },
};
