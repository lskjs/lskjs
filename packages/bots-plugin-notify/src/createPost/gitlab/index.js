import build from './build';
import mergeRequest from './mergeRequest';
import pipeline from './pipeline';
import push from './push';

export default function (message, project, provider) {
  const { object_kind: objectKind, object_attributes: objectAttributes, build_status: buildStatus } = message.meta;
  if (objectKind === 'pipeline' && project.gitlab?.[`pipeline__${objectAttributes.status}`]) {
    return pipeline(message, provider);
  }
  if (objectKind === 'build' && project.gitlab?.[`build__${buildStatus}`]) {
    return build(message, provider);
  }
  if (objectKind === 'merge_request') {
    return mergeRequest(message, provider);
  }
  if (objectKind === 'push') {
    return push(message, provider);
  }

  return null;
}
