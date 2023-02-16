export default (ClassOrFunction, ...args) => {
  try {
    return new ClassOrFunction(...args);
  } catch (err) {
    return ClassOrFunction(...args);
  }
};
