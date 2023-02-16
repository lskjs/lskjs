import isIp from 'is-ip';

export function getIpv(ip: string) {
  const v = isIp.version(ip);
  return v ? `v${v}` : null;
}

export default getIpv;
