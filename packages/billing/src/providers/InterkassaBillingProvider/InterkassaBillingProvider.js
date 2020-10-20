import SHA256 from 'crypto-js/sha256';
import axios from 'axios';
import isPlainObject from 'lodash/isPlainObject';
import querystring from 'querystring';
import BillingProvider from '../BillingProvider';
/**
 *
 * Docs: https://docs.interkassa.com/
 *
 * config: {
 *   username: 'your_shopId', // id пользователя https://docs.interkassa.com/#section/Privatnye-resursy
 *   password: 'your_secretKey' // ключ
 *
 *   coId: 'your_coId' // Checkout ID https://docs.interkassa.com/#section/3.-Protokol/3.2.-Forma-zaprosa-platezha
 *   secretKey: 'your_secretKey' // https://docs.interkassa.com/#section/3.-Protokol/3.5.-Formirovanie-cifrovoj-podpisi
 * }
 *
 */

export default class InterkassaBillingProvider extends BillingProvider {
  provder = 'interkassa';
  baseURL = 'https://api.interkassa.com/v1/';
  baseSciURL = 'https://sci.interkassa.com'; // Shop Cart Interface
  async init() {
    await super.init();
    if (!this.config) {
      this.log.warn('!config');
      return;
    }
    const { username, password } = this.config;
    if (!username) throw '!username';
    if (!password) throw '!password';
    this.client = axios.create({
      baseURL: this.baseURL,
      auth: { username, password },
    });
  }

  // https://docs.interkassa.com/#section/3.-Protokol/3.2.-Forma-zaprosa-platezha
  // TODO: почиать про 4.1.2. Получение доступного для кассы списка платежных направлений: https://docs.interkassa.com/#section/4.-Rasshirennye-vozmozhnosti/4.1.2.-Poluchenie-dostupnogo-dlya-kassy-spiska-platezhnyh-napravlenij
  createPaymentUrl(initParams, signature = true) {
    if (!this.config.secretKey) throw '!config.secretKey';
    if (!initParams) throw '!initParams';
    if (!isPlainObject(initParams)) throw 'initParams is not a object';
    const params = { ...initParams };

    params.ik_co_id = this.config.coId;
    params.ik_am = parseFloat(params.ik_am).toString();
    Object.keys(params).forEach(function (p) {
      if (!/^ik_/i.test(p) || p === 'ik_sign') {
        delete params[p];
      }
    });

    const paramsArray = Object.keys(params)
      .sort()
      .map((key) => params[key]);
    paramsArray.push(this.config.secretKey);
    const paramsString = paramsArray.join(':');
    if (signature) {
      params.ik_sign = SHA256(paramsString);
    }

    return `${this.baseSciURL}?${querystring.stringify(params)}`;
  }

  coInvoice(internalId) {
    const {
      data: { data },
    } = this.client.get(`/co-invoice/${internalId}`);
    return data;
  }
}
