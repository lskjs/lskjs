// export default (text = '') => text.replaceAll(/[*|_|~]/gi, (c) => `\\${c}`);
// export default (text = '') => text.replaceAll(/[*|_|.|!|\[|\]|\(|\)|\{|\}|+|-|#|*|~]/gi, (c) => `\\${c}`);
export default (text = '') => text.replaceAll(/[^A-Za-z0-9А-Яа-я]/gi, (c) => `\\${c}`);