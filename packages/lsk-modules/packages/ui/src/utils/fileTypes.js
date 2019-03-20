import fromPairs from 'lodash/fromPairs';

import Image from 'react-icons2/mdi/file-image';
import Doc from 'react-icons2/mdi/file-document';
import Word from 'react-icons2/mdi/file-word';
import Table from 'react-icons2/mdi/file-excel';
import Pdf from 'react-icons2/mdi/file-pdf';
import Music from 'react-icons2/mdi/file-music';
import Video from 'react-icons2/mdi/file-video';
import Presentation from 'react-icons2/mdi/file-powerpoint';
import File from 'react-icons2/mdi/file';

function assign(arr, type) {
  const prepare = arr.map(e => ([e, type]));
  return fromPairs(prepare);
}

const imageTypes = ['jpg', 'jpeg', 'exif', 'bmp', 'png', 'gif', 'tiff', 'webp', 'heif'];
const docTypes = ['txt', 'rtf', 'csv'];
const wordTypes = ['doc', 'docx', 'odt'];
const tableTypes = ['xls', 'xlsx', 'ods'];
const pdfTypes = ['pdf', 'djvu', 'djv'];
const presentationTypes = ['ppt', 'pptx', 'djv', 'odp'];
const musicTypes = [
  'aac', 'alac', 'ac3', 'aiff', 'dts', 'flac', 'mp3', 'ogg', 'opus', 'wma',
  'wav', 'raw', 'dxd', 'dsd', 'speex', 'mp2', 'm4a', 'swa', 'm3u', 'm3u8',
  'xspf', 'pls', 'asx', 'aimppls', 'plc', 'wpl',
];
const videoTypes = [
  'webm', 'mkv', 'flv', 'vob', 'ogv', 'drc', 'gifv', 'mng', 'avi', 'mts', 'm2ts',
  'mov', 'qt', 'wmv', 'yuv', 'rm', 'rmvb', 'asf', 'amv', 'mp4', 'm4p', 'm4v',
  'mpg', 'mpeg', 'mpe', 'mpv', 'm2v', 'm4v', 'svi', '3gp', '3g2', 'mxf', 'roq',
  'nsv', 'f4v', 'f4p', 'f4a', 'f4b',
];

export default {
  ...assign(imageTypes, Image),
  ...assign(docTypes, Doc),
  ...assign(wordTypes, Word),
  ...assign(tableTypes, Table),
  ...assign(pdfTypes, Pdf),
  ...assign(presentationTypes, Presentation),
  ...assign(musicTypes, Music),
  ...assign(videoTypes, Video),
  other: File,
};
