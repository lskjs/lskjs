import { build } from './build';
import { mergeRequest } from './mergeRequest';
import { pipeline } from './pipeline';
import { push } from './push';

export function github(message, project, bot) {
  if (this.debug) this.log.trace('github.message', message);

  const { event } = message;
  const { object_attributes: objectAttributes, build_status: buildStatus } = message.meta;

  if (event === 'pipeline' && project.gitlab?.[`pipeline__${objectAttributes.status}`]) {
    return pipeline(message, bot);
  }
  if (event === 'build' && project.github?.[`build__${buildStatus}`]) {
    return build(message, bot);
  }
  if (event === 'pull_request') {
    return mergeRequest(message, bot);
  }
  if (event === 'push') {
    return push(message, bot);
  }

  return null;
}

export default github;
