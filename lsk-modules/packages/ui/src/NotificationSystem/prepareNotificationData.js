export default function (rawData, { defaultType = 'info' }) {
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
    data.type = 'error';
  }

  if (!data.text && data.message) {
    data.text = data.message;
  }
  if (!data.text && rawData && rawData.message) {
    data.text = rawData.message;
  }

  return data;
}
