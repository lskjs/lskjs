/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const { address } = require('ip');
const { createServer } = require('dnsjack');

const dns = process.env.DNS_PROXY || process.env.DNS_DNS || '8.8.8.8';
const hosts = process.env.DNS_HOST.split(',');
const ip = process.env.DNS_IP || address();
createServer(dns)
  .route(hosts, ip)
  .route('hijay5.isuvorov.com', '68.183.70.237')
  .on('resolve', data => process.env.DNS_LOG && console.log(`[DNS] ${data.rinfo.address} => ${data.domain}`))
  .listen();

console.log(
  `[DNS] listen on ${address()}:53 [${hosts}] => ${ip} [proxy dns=${dns}] log=${String(!!process.env.DNS_LOG)}`,
);
