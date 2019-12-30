import objects2grid from './objects2grid';
import grid2csv from './grid2csv';

export default params => grid2csv(objects2grid(params));
