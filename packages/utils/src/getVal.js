export default val => {
  try {
    return (val || '').toString().replace(/\\n/g, '\n');
  } catch (err) {
    console.log('getVal err', err, val);
  }
};
