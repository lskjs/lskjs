export default async function (params = {}) {
  const config = this.config.i18 || {};
  return {
    // interpolation: {
    //   format(value = '', format) {
    //     // console.log(format, value);
    //     if (format === 'short') return value.replace(/https?:\/\//, '');
    //     if (format === 'avatar') return (value.getAvatar ? value.getAvatar() : value.avatar) || '';
    //     if (format === 'link') {
    //       return (value.getLink ? value.getLink() : value.link) || '';
    //     }
    //     if (format === 'url') return this.url(value);
    //     if (format === 'abs') return Math.abs(value);
    //     if (format === 'dollar') return formatter(value, '$');
    //     if (format === 'dollarAbs') return formatter(Math.abs(value), '$');
    //     if (format === 'cent') return formatter(value / 100, '$');
    //     if (format === 'centAbs') return formatter(Math.abs(value) / 100, '$');
    //     return value;
    //   },
    // },
    ...config,
    ...params,
  };
}
