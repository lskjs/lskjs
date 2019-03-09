export default function () {
  return {
    signup: require('./signup').default,
    changeEmail: require('./changeEmail').default,
    restorePassword: require('./restorePassword').default,
  };
}
