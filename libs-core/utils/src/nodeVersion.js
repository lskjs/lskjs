export default () => (typeof process !== 'undefined' ? Number(process.version.match(/^v(\d+\.\d+)/)[1]) : null);
