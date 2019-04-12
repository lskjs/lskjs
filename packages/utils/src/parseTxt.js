import grid2objects from './grid2objects';
import csv2grid from './csv2grid';
import txtToArray from './txtToArray';

export default (str = '') => {
  return grid2objects(
    csv2grid(
      txtToArray(str || ''),
    ),
  );
};
