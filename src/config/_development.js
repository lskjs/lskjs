export default (config) => ({
  proxy: {
    enabled: true,
    options: {
      // koa-proxy options
      host: `http://${config.server_host}:8000`,
      match: /^\/api\/.*/
    }
  }
})
