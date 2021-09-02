import build from './build';
import mergeRequest from './mergeRequest';
import pipeline from './pipeline';
import push from './push';

export default function (message, project, provider) {
  const { event } = message;
  const { object_attributes: objectAttributes, build_status: buildStatus } = message.meta;

  if (event === 'pipeline' && project.gitlab?.[`pipeline__${objectAttributes.status}`]) {
    return pipeline(message, provider);
  }
  if (event === 'build' && project.github?.[`build__${buildStatus}`]) {
    return build(message, provider);
  }
  if (event === 'pull_request') {
    return mergeRequest(message, provider);
  }
  if (event === 'push') {
    return push(message, provider);
  }

  return null;
}
