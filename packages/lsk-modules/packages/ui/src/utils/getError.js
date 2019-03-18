

export default (objectOrString) => {
  if (typeof objectOrString === 'string') return { message: objectOrString };
  return {
    ...objectOrString,
    message: objectOrString.message || objectOrString.err || 'Error',
  };
};
