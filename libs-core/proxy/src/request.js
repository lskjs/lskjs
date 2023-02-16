import { createRequest } from './createRequest';
import createProxyManager from './ProxyManager/global';

export const request = createRequest({ proxyManager: createProxyManager() });

export default request;
