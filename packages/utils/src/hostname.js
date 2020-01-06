import os from 'os';

export default () => process.env.NODE_HOSTNAME || process.env.HOSTNAME || os.hostname();
