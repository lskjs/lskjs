export default () => typeof window !== 'undefined' && window.navigator.msSaveOrOpenBlob && window.Blob;
