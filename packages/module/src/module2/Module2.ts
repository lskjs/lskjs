import { IApp, IModule } from './types';
import { ModuleWithSubmodules } from './ModuleWithSubmodules';

// export abstract class ModuleWithApp extends ModuleWithSubmodules {
//   app?: IApp;
// }

export abstract class Module2 extends ModuleWithSubmodules implements IModule {
  app?: IApp;
}

export default Module2;
