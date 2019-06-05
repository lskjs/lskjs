export default (str, defaultValue = str) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return defaultValue;
  }
};
