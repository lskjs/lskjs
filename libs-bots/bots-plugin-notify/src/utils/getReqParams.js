export const getReqParams = (req) => {
  const token =
    req.get('X-Gitlab-Token') ||
    req.get('X-Access-Token') ||
    req.get('X-Auth-Token') ||
    req.get('token') ||
    req.query?.secret ||
    req.data?.secret;

  const gitlabEvent = req.get('X-Gitlab-Event');
  const githubEvent = req.get('X-Github-Event');
  const isAlertManager = (req.get('User-Agent') || '').includes('Alertmanager');
  const isGraylog = req.body && req.body.event_definition_id && req.body.job_trigger_id && req.body.job_definition_id;

  return {
    token,
    gitlabEvent,
    githubEvent,
    isAlertManager,
    isGraylog,
  };
};

export default getReqParams;
