export default function () {
  return {
    approveEmail: require('./approveEmail').default,
    recovery: require('./recovery').default,
    changeEmail: require('./changeEmail').default,
    setEmail: require('./setEmail').default,
    restorePassword: require('./restorePassword').default,
  };
}
