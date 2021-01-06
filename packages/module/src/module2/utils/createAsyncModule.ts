// @ts-ignore
import importFn from '@lskjs/utils/importFn';
import { IModuleConstructor, IModule, IAsyncModule,  } from '../types';

export const createAsyncModule = async (initArg: IAsyncModule, parentModule?: IModule): Promise<IModule> => {
  if (initArg.__module) return initArg as IModule;
  const arg = (await importFn(initArg)) as IModuleConstructor<IModule>;
  // if (arg instanceof IModuleConstructor) return arg.create(parentModule);
  // if (arg instanceof IModuleConstructor) return arg.create(parentModule);
  // if (typeof arg === IModule) return arg;

  // if (typeof arg === IModuleConstructor) return arg.create(parentModule);
  // if (typeof arg === IAsyncModule) {
  //   const AsyncModule = importFn(IAsyncModule)
  // }
  return arg.create({ parent: parentModule });
};

export default createAsyncModule;