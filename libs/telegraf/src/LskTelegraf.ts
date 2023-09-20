import { getEnvConfig, Logger } from '@lskjs/log';
import { Telegraf } from 'telegraf';

import { waitFn } from './utils/utils';

const log = new Logger({
  ns: 'telegraf',
  ...getEnvConfig(),
  level: 'error',
});

export class LskTelegraf extends Telegraf {
  async launch(config: Telegraf.LaunchOptions = {}) {
    log.debug('Connecting to Telegram');
    this.botInfo ??= await this.telegram.getMe();
    log.debug(`Launching @${this.botInfo.username}`);

    if (config.webhook === undefined) {
      await this.telegram.deleteWebhook({
        drop_pending_updates: config.dropPendingUpdates,
      });
      log.debug(`Bot starting with long polling @${this.botInfo.username}`);
      // @ts-ignore
      this.startPolling(config.allowedUpdates);
      await waitFn(
        () =>
          // @ts-ignore
          this.botInfo && this.polling?.abortController,
        10,
        10000,
      );
      log.info(`Bot started with long polling @${this.botInfo.username}`);

      return;
    }

    // @ts-ignore
    if (config.webhook.url) {
      // @ts-ignore
      await this.telegram.setWebhook(config.webhook.url, {
        drop_pending_updates: config.dropPendingUpdates,
        allowed_updates: config.allowedUpdates,
        ip_address: config.webhook.ipAddress,
        max_connections: config.webhook.maxConnections,
        secret_token: config.webhook.secretToken,
        certificate: config.webhook.certificate,
      });
      // @ts-ignore
      log.debug(`Bot started with webhook @ ${config.webhook.url}`);
      return;
    }

    // @ts-ignore
    const domainOpts = this.getDomainOpts({
      domain: config.webhook.domain,
      path: config.webhook.hookPath,
    });

    const { tlsOptions, port, host, cb, secretToken } = config.webhook;

    // @ts-ignore
    this.startWebhook(domainOpts.path, tlsOptions, port, host, cb, secretToken);

    await this.telegram.setWebhook(domainOpts.url, {
      drop_pending_updates: config.dropPendingUpdates,
      allowed_updates: config.allowedUpdates,
      ip_address: config.webhook.ipAddress,
      max_connections: config.webhook.maxConnections,
      secret_token: config.webhook.secretToken,
      certificate: config.webhook.certificate,
    });

    log.debug(`Bot started with webhook @ ${domainOpts.url}`);
  }

  async stop(reason = 'unspecified'): Promise<void> {
    log.trace('Stopping bot... Reason:', reason);

    // @ts-ignore
    if (!this.polling && !this.webhookServer) {
      log.warn('Bot is not running');
    }
    // @ts-ignore
    if (this.polling) {
      // @ts-ignore
      this.polling.stop();
      // @ts-ignore
      await waitFn(() => this.polling.abortController?.signal?.aborted, 10, 10000);
    }
    // @ts-ignore
    if (this.webhookServer) {
      // @ts-ignore
      this.webhookServer?.close();
    }
  }
}

export default LskTelegraf;
