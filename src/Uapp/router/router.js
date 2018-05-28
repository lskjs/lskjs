import TestPage from './TestPage';

export default uapp => ({
  path: '(.*)',
  action(params) {
    const { page, uapp } = params;
    // console.log({TestPage});
    if (__CLIENT__) {
      uapp.log.trace(params.pathname, params);
    }
    return page.component(TestPage, {
      count: 10
    });
  }
})
