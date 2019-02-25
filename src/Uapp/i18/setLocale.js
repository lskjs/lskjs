import Cookies from 'js-cookie';

export default async function (locale) {
  // TODO:
  // uapp.setState({ locale });
  if (locale && this.user && this.user?.locale !== locale) {
    try {
      const { UserStore } = this.stores;
      await UserStore.update({
        _id: this.user?._id,
        locale,
      });
    } catch (err) {
      console.error('uapp.setLocale', err); // eslint-disable-line no-console
    }
  }
  if (Cookies && locale && Cookies.get('locale') !== locale) {
    Cookies.set('locale', locale);
  }
  if (this.t('locale') !== locale) {
    await this.i18.setLocale(locale);
    // setTimeout(() => {     //   uapp.history.go(0);    // }, 500);
  }
}
