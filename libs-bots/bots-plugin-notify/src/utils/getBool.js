export const getBool = (param, def) => (param == null ? def : +param);

export default getBool;
