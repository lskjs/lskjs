export default function () {
  return {
    raw: require('./raw').default,
    signup: require('./signup').default,
    changeEmail: require('./changeEmail').default,
    restorePassword: require('./restorePassword').default,
  };
}
