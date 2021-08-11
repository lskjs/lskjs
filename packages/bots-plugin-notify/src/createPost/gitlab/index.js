import build from './build';
import mergeRequest from './mergeRequest';
import pipeline from './pipeline';
import push from './push';

export default function (message, project) {
  const { object_kind: objectKind, object_attributes: objectAttributes, build_status: buildStatus } = message.meta;
  if (objectKind === 'pipeline' && project.gitlab?.[`pipeline__${objectAttributes.status}`]) {
    return pipeline(message);
  }
  if (objectKind === 'build' && project.gitlab?.[`build__${buildStatus}`]) {
    return build(message);
  }
  if (objectKind === 'merge_request') {
    return mergeRequest(message);
  }
  if (objectKind === 'push') {
    return push(message);
  }

  return null;
}
