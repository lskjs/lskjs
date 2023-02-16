import BaseBotProvider from '@lskjs/bots-provider';
/**
 * Docs: https://github.com/dilame/instagram-private-api
 */
declare type InstagramBotConfigType = {
    username: string;
    password: string;
};
export declare class InstagramBotProvider extends BaseBotProvider {
    client: any;
    provider: string;
    IgApiClient: any;
    eventTypes: never[];
    config: InstagramBotConfigType;
    init(): Promise<void>;
    run(): Promise<void>;
}
export default InstagramBotProvider;
