import isIp from 'is-ip';

export const getIpv = (ip) => {
  const v = isIp.version(ip);
  return v ? `v${v}` : null;
};

export default getIpv;
