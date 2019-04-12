import CSV from 'csv-string';

export default (csv) => {
  const result = [];
  CSV.forEach(csv, '\t', (row) => {
    result.push(row);
  });
  result.splice(result.length - 1, 1);
  return result;
}