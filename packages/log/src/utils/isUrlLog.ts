export const isUrlLog = (mainArg: any) => mainArg.name === 'req' || (mainArg.method && mainArg.url && mainArg.status); // reqId
export default isUrlLog;
