export default function () {
  return {
    recovery: require('./recovery').default,
    approveEmail: require('./approveEmail').default,
  };
}
