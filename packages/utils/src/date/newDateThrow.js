export default (dateStr) => {
  const date = new Date(dateStr);
  if (date.toString() === 'Invalid Date') {
    throw {
      code: 'INVALID_DATE',
      date,
      dateStr,
    };
  }
  return date;
};
