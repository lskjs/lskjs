export default (text = '') => text.replaceAll(/[*|_|~]/gi, (c) => `\\${c}`);
