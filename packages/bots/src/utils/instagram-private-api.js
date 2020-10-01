import { IgApiClient as BaseIgApiClient } from 'instagram-private-api';
import Bluebird from 'bluebird';

export class IgApiClient extends BaseIgApiClient {
  async getId({ pk, id, username } = {}) {
    if (pk) return pk;
    if (id) return id;
    const igId = await this.user.getIdByUsername(username);
    return igId;
  }
  async getAccountInfo(params) {
    return this.user.info(await this.getId(params));
  }
  async getPosts(params) {
    const userFeed = this.feed.user(await this.getId(params));

    return userFeed.items();
  }
  async getFollowers(params) {
    const userFeed = this.feed.accountFollowers(await this.getId(params));
    return userFeed.items();
  }
  async likeAll(username) {
    const targetUserId = await this.user.getIdByUsername(username);
    const userFeed = this.feed.user(targetUserId);
    const posts = await userFeed.items();
    // console.log({posts})
    await Bluebird.mapSeries(posts, async (post) => {
      await this.media.like({
        mediaId: post.id,
        moduleInfo: {
          module_name: 'profile',
          user_id: this.loggedInUser.pk,
          username: this.loggedInUser.username,
        },
        d: 1,
      });
    });
  }
}

export default { IgApiClient };
