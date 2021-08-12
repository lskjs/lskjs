// @ts-ignore
import Err from '@lskjs/err';
import importFn from '@lskjs/utils/importFn';

import { IAsyncModule, IModule } from '../types';
import { createModule } from './createModule';

export const createAsyncModule = async (
  initArg: IAsyncModule,
  parentProps: Record<string, unknown>,
): Promise<IModule> => {
  if (initArg.__module) return initArg as IModule;
  const arg = await importFn(initArg);
  if (!arg) throw new Err('!Component');
  if (Array.isArray(arg)) {
    const [Module, ...propsArray] = arg;
    return createModule(Module, ...propsArray, parentProps);
  }
  if (arg.Module) {
    const { Module, ...props } = arg;
    return createModule(Module, { ...props, ...parentProps });
  }
  return createModule(arg, parentProps);
  // console.log({ arg });
  // if (arg instanceof IModuleConstructor) return arg.create(parentModule);
  // if (arg instanceof IModuleConstructor) return arg.create(parentModule);
  // if (typeof arg === IModule) return arg;

  // if (typeof arg === IModuleConstructor) return arg.create(parentModule);
  // if (typeof arg === IAsyncModule) {
  //   const AsyncModule = importFn(IAsyncModule)
  // }
  // return arg.create(parentProps);
};

export default createAsyncModule;
