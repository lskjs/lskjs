import getReqDomain from './getReqDomain';

export default (req) => `${req.protocol}://${getReqDomain(req)}`;
