function checkMatches(arr) {
  if (Array.isArray(arr)) {
    if (arr[9] && arr[9].length === 11) return arr[9];
    if (arr[7] && arr[7].length === 11) return arr[7];
  }
  return false;
}

export function getYoutubeIdFromUrl(url = '') {
  if (!url) return null;
  // старая регуларка
  // const regExp = new RegExp('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i');
  // const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;  //eslint-disable-line
  // const getVideoId = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??((.*v=([^#\&\?]*))|([^#\&\?]*))/; // eslint-disable-line
  const match = url.trim().match(regExp);
  return checkMatches(match);
}

export default getYoutubeIdFromUrl;
