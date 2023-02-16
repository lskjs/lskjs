import { build } from './build';
import { mergeRequest } from './mergeRequest';
import { pipeline } from './pipeline';
import { push } from './push';

export function gitlab(message, project, bot) {
  if (this?.debug) this.log.trace('gitlab.message', message);

  const { object_kind: objectKind, object_attributes: objectAttributes, build_status: buildStatus } = message.meta;
  if (objectKind === 'pipeline' && project.gitlab?.[`pipeline__${objectAttributes.status}`]) {
    return { msg: pipeline(message, bot) };
  }
  if (objectKind === 'build' && project.gitlab?.[`build__${buildStatus}`]) {
    return { msg: build(message, bot) };
  }
  if (objectKind === 'merge_request') {
    return { msg: mergeRequest(message, bot) };
  }
  if (objectKind === 'push') {
    return { msg: push(message, bot) };
  }

  return null;
}

export default gitlab;
