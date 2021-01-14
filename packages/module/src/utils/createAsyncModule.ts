// @ts-ignore
import importFn from '@lskjs/utils/importFn';
import { IModuleConstructor, IModule, IAsyncModule } from '../types';

export const createAsyncModule = async (initArg: IAsyncModule, parentProps: object): Promise<IModule> => {
  if (initArg.__module) return initArg as IModule;
  const arg = (await importFn(initArg))
  if (!arg) throw '!Component';
  if (Array.isArray(arg)) {
    const [Module, ...propsArray] = arg;
    return (Module as IModuleConstructor<IModule>).create(...propsArray, parentProps);
  }
  if (arg.Module) {
    const { Module, ...props } = arg;
    return (Module as IModuleConstructor<IModule>).create({ ...props, ...parentProps });
  }
  // console.log({ arg });
  // if (arg instanceof IModuleConstructor) return arg.create(parentModule);
  // if (arg instanceof IModuleConstructor) return arg.create(parentModule);
  // if (typeof arg === IModule) return arg;

  // if (typeof arg === IModuleConstructor) return arg.create(parentModule);
  // if (typeof arg === IAsyncModule) {
  //   const AsyncModule = importFn(IAsyncModule)
  // }
  return arg.create(parentProps);
};

export default createAsyncModule;
