import { IModule } from '../types';

export const createModule = async (
  ClassOrFunction: any,
  ...args: any[]
): Promise<IModule> => {
  if (ClassOrFunction.create) {
    const obj = await ClassOrFunction.create(...args);
    return obj;
  }
  try {
    const obj = new ClassOrFunction(...args);
    if (obj.init) await obj.init();
    return obj;
  } catch (err) {
    const obj = ClassOrFunction(...args);
    if (obj.init) await obj.init();
    return obj;
  }
};

export default createModule;
