import grid2objects from './grid2objects';

export default (str = '') => {
  str = str.replace(/&#8232;/g, '');
  // console.log('str', str.slice(0, 100));
  const maybeJson = JSON.parse(str);
  // console.log('maybeJson', maybeJson.slice(0, 2));
  const objects = grid2objects(maybeJson);
  // console.log('objects', objects.slice(0, 2));
  return objects;
};
