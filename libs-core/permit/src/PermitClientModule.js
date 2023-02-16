import Module from '@lskjs/module';

import stores from './stores';

export class PermitClientModule extends Module {
  async getModules() {
    return {
      ...(await super.getModules()),
      stores: [() => import('@lskjs/mobx/mobxStores'), { stores }],
    };
  }
}

export default PermitClientModule;
