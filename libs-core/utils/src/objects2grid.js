export default (objects, cols) => {
  if (!cols) cols = Object.keys(objects[0]);
  const rows = [];
  rows.push(cols);
  objects.forEach((object) => {
    const row = [];
    cols.forEach((col) => {
      row.push(object[col]);
    });
    rows.push(row);
  });
  return rows;
};
