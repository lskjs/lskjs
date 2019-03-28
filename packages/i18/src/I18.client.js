import { observable } from 'mobx';
import I18Base from './I18.common';

export default class I18 extends I18Base {
  @observable locale;
  @observable t;
  @observable m;
  @observable i18;
}
