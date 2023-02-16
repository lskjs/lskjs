import { observable } from 'mobx';

import { I18Instance } from './I18Instance';

export class I18MobxInstance extends I18Instance {
  @observable locale;
  @observable t;
  @observable m;
  @observable i18;
}

export default I18MobxInstance;
