export default (str, defaultValue = null) => {
  try {
    return JSON.stringify(str);
  } catch (err) {
    return defaultValue;
  }
};
