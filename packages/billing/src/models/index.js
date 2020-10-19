// export default {
//   BillingTransactionModel: () => import('./BillingTransactionModel'),
// };
export default (...args) => ({
  BillingTransactionModel: require('./BillingTransactionModel').default(...args),
});
