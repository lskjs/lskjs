export default {
  action: ({ page }) => {
    return page
      .pushTitle('Главная')
      .component(import('./HomePage'), {});
  },
};
