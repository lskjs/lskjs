import csv2grid from './csv2grid';
import grid2objects from './grid2objects';
import txtToArray from './txtToArray';

export default (str = '') => grid2objects(csv2grid(txtToArray(str || '')));
