import Vkontakte from 'passport-vkontakte';
export default (ctx, { Strategy }) => class VkontakteStrategy extends Strategy {
  Strategy = Vkontakte.Strategy
  providerName = 'vkontakte'

  static getPassportParams() {
    return { scope: ctx.config.auth.socials.vkontakte.scope };
  }

  async getProfile(passport) {
    const fields = [
      'sex',
      'bdate',
      'city',
      'country',
      'photo_50',
      'photo_100',
      'photo_200',
      'photo_max_orig',
      'photo_max',
    ];
    const res = await fetch(
      `https://api.vk.com/method/users.get?fields=${fields.join(',')}&access_token=${passport.token}`,
    );
    const json = await res.json();
    const data = json.response[0];

    return {
      firstName: data.first_name,
      lastName: data.last_name,
      gender: data.sex === 1 ? 'female' : 'male',
      photos: [
        data.photo_50,
        data.photo_100,
        data.photo_200,
        data.photo_max,
        data.photo_max_orig,
      ],
      bdate: data.bdate,
      avatar: data.photo_200,
      city: `Город ${data.city}`,
      country: `Страна ${data.country}`,
    };
  }
};
