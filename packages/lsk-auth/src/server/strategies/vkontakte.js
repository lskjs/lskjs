import Vkontakte from 'passport-vkontakte';
import fetch from 'isomorphic-fetch';

export default (ctx, { Strategy }) => class VkontakteStrategy extends Strategy {
  Strategy = Vkontakte.Strategy
  type = 'vkontakte'

  async getProfile(passport) {  //eslint-disable-line
    console.log('getProfile', passport);

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
      'domain',
      'id',
      'about',
    ];
    const res = await fetch(`https://api.vk.com/method/users.get?fields=${fields.join(',')}&access_token=${passport.token}&v=5`);
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
      domain: data.domain,
      about: data.about,
      bdate: data.bdate,
      avatar: data.photo_200,
      city: data.city,
      country: data.country,
    };
  }
};
