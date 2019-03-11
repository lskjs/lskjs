export default function (rawData, defaultType = 'info') {
  let data = {};
  if (typeof rawData === 'string') {
    data.title = rawData;
  } else {
    data = {
      ...rawData,
    };
  }

  if (!data.type) {
    data.type = defaultType;
  }

  if (data.type === 'danger') {
    if (__DEV__) console.error('deprecated type danger', data);  //eslint-disable-line
    data.type = 'error';
  }

  if (!data.text && data.message) {
    data.text = data.message;
  }
  if (!data.text && rawData && rawData.message) {
    data.text = rawData.message;
  }
  if (!data.title) {
    if (data.type === 'error') {
      data.title = this.t('notifications.default.error');
    } else {
      data.title = this.t('notifications.default.success');
    }
  }

  return data;
}
