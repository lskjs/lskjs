/* eslint-disable no-param-reassign */
import Err from '@lskjs/err';
import get from 'lodash/get';
import shuffle from 'lodash/shuffle';
import sortBy from 'lodash/sortBy';
import sumBy from 'lodash/sumBy';

import { ProxyStrategy } from './ProxyStrategy';
// import request from './request';

export class LinearProxyStrategy extends ProxyStrategy {
  // consts
  // 10 проксей парсят
  // на них выделяется 95% попыток парсинга
  // на остальные прокси выделяется 5% попыток, потому что, вдруг они там за это время починились
  maxPrimaryProxiesCount = 10;
  primaryProxiesProbablity = 0.95;

  // vars
  primaryProxies = [];
  primaryProxiesCount = 0;
  secondaryProxies = [];
  secondaryProxyIteration = 0;
  kpdSum = 0;

  //
  getStats() {
    this.update();
    return {
      primaryProxiesCount: this.primaryProxiesCount,
      secondaryProxyIteration: this.secondaryProxyIteration,
      kpdSum: this.kpdSum,
    };
  }
  update() {
    const proxies = this.manager.list;
    if (!proxies) return;
    proxies.forEach((proxy) => {
      proxy.stats.kpd = this.countKpd(proxy);
      proxy.stats.probability = 0;
    });
    const sortedProxies = sortBy(proxies, (p) => -get(p, 'stats.kpd'));
    const isWorkingProxy = (p) => get(p, 'stats.kpd', 0) > 0 && get(p, 'stats.count', 0) > 0;

    // количество реальных прокси
    this.primaryProxies = sortedProxies.filter(isWorkingProxy).slice(0, this.maxPrimaryProxiesCount);
    this.primaryProxiesCount = this.primaryProxies.length;
    this.secondaryProxies = shuffle(sortedProxies.slice(this.primaryProxiesCount));

    // тот КПД который будет разыгрываться между основными проксями
    this.kpdSum = sumBy(this.primaryProxies, (p) => get(p, 'stats.kpd'));
    if (this.kpdSum < 1) this.kpdSum = 0; // если суммарного кпд еще мало, то считаем что его нет (ну мелочь всякая пока, не попарсили)

    this.primaryProxies.forEach((proxy) => {
      if (this.kpdSum) {
        // если есть суммарный кпд то разыгрываеи его
        proxy.probability = (get(proxy, 'stats.kpd') / this.kpdSum) * this.primaryProxiesProbablity; // TODO, как гипотезу можно рассмотреть какую нибудь не линейную функцию
      } else {
        // если его нет, то распределяем вероятность между проксями линейно
        proxy.probability = (1 / this.primaryProxiesCount) * this.primaryProxiesProbablity;
      }
    });
  }

  getProxy() {
    if (!get(this, 'manager.list.length', 0)) throw new Err('PROXY_LIST_EMPTY');

    const initProbability = Math.random();
    let sumProbability = 0;
    for (let i = 0; i < this.primaryProxies.length; i += 1) {
      sumProbability += +get(this.primaryProxies, `${i}.stats.probability`) || 0;
      if (initProbability < sumProbability) return this.primaryProxies[i];
    }

    this.secondaryProxyIteration += 1;
    return this.secondaryProxies[this.secondaryProxyIteration % this.secondaryProxies.length];
  }

  // эстимация количества спаршенных видео в минуту
  countKpd(proxy) {
    const success = get(proxy, 'stats.statuses.success', 0);
    const error = get(proxy, 'stats.statuses.error', 0);
    const count = get(proxy, 'count', 0);
    if (!count) return 0; // 1 - один по умолчанию потому что они должны быть в списке круче чем сломанные прокси у которых 0
    const avgTime = count ? get(proxy, 'time', 0) / get(proxy, 'count', 1) : 0;
    const errorTime = error ? get(proxy, 'statusesTime.error', 0) / error : 0;
    return 60000 / (avgTime + (error / success) * errorTime);
  }

  async run() {
    await super.run();
    await this.update();
  }
}

export default LinearProxyStrategy;
