import { IModuleWithСonfig } from './types';
import { ModuleWithWorkflow } from './ModuleWithWorkflow';

export abstract class ModuleWithConfig extends ModuleWithWorkflow implements IModuleWithСonfig {
  config: { [key: string]: any; };
}

export default ModuleWithConfig;