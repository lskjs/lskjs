import { Err } from '@lskjs/err';

import { IAsyncModule, IModule } from '../types';
import { createModule } from './createModule';
import { importFn } from './importFn';

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
};

export default createAsyncModule;
