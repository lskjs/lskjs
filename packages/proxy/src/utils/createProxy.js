import { Proxy } from '../Proxy';

export const createProxy = (proxy) => new Proxy(proxy); // TODO: check if uri or proxy object

export default createProxy;
