import Cookies from 'js-cookie';

export default async function (locale) {
  // TODO:
  // uapp.setState({ locale });

  if (locale && this.user && this.user?.locale !== locale) {
    // console.log('user.editUser');
    await this.user.editUser({
      locale,
    });
  }
  if (Cookies && locale && Cookies.get('locale') !== locale) {
    // console.log('Cookies');
    Cookies.set('locale', locale);
  }
  if (this.t('locale') !== locale) {
    // console.log('t(locale');
    await this.initI18({
      lng: locale,
    });

    // setTimeout(() => {
    //   uapp.history.go(0);
    // }, 500);
  }
}
