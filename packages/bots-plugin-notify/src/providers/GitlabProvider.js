import BaseProvider from './BaseProvider';

const buildStatuses = {
  success: '✅',
  pending: '🕔',
  failed: '❌',
  canceled: '🙅‍♂️',
  created: '🐣',
  running: '🏃💨',
  default: (name) => `🤷‍♀️ ${name}`,
};
const mergeRequestStatuses = {
  opened: '🎉',
  closed: '❌',
  merged: '🤝',
  default: (name) => `🤷‍♀️ ${name}`,
};
const pipelineStatuses = {
  success: '✅',
  pending: '🕔',
  failed: '❌',
  canceled: '🙅‍♂️',
  created: '🐣',
  running: '🏃💨',
  default: (name) => `🤷‍♀️ ${name}`,
};

export default class GitlabProvider extends BaseProvider {
  onBuild(message) {
    const {
      // commit,
      repository,
      // object_attributes: objectAttributes,
      user,
      build_name: buildName,
      project_name: projectName,
      build_status: buildStatus,
      build_id: buildId,
    } = message.meta;
    const status = buildStatuses[buildStatus] || buildStatuses.default(buildStatus);
    const msg = `\
    \`${projectName}\`
  ${status} *${buildName}*
  _${user.name}_
  ${repository.homepage}/-/jobs/${buildId}`;
    // this.sendMessageCI(process.env.CHAT_ID, message);
    return msg;
  }
  onMergeRequest(message) {
    const { user, object_attributes: objectAttributes } = message.meta;
    const status = mergeRequestStatuses[objectAttributes.state] || mergeRequestStatuses.default(objectAttributes.state);
    const message2 = objectAttributes.title ? `\`${objectAttributes.title}\`\n` : '';
    const msg = `\
  🍻 ${status} ${objectAttributes.state} ${objectAttributes.source_branch} -> ${objectAttributes.target_branch}
  @${user.username}
  ${message2}
  [${objectAttributes.url}](${objectAttributes.url})
  `.trim();

    return msg;
  }
  onPipeline(message) {
    const { commit, project, object_attributes: objectAttributes, user } = message.meta;
    const status = pipelineStatuses[objectAttributes.status] || pipelineStatuses.default(objectAttributes.status);
    const message2 = commit.message ? `\`${commit.message}\`` : '';
    // console.log('commit.author', commit.author);
    const msg = `\
  ${status} ${project.name}/${objectAttributes.ref}
  @${user.username}
  ${message2}
  ${project.web_url}/pipelines/${objectAttributes.id}
  `.trim();
    // this.sendMessageCI(process.env.CHAT_ID, message);
    return msg;
  }
  onPush(message) {
    const { branch } = message;
    const { user_username: username, repository = {}, commits = [] } = message.meta;

    const branches = [branch, ...(message.branches || [])];

    const commitsMessage = commits.map((commit) => {
      const short = commit.id.slice(0, 7);
      return `\
  [${short}](${commit.url}) _${commit.author?.name}_ 
  \`${commit.message}\``;
    });

    const msg = `\
  @${username}
  Push to \`${repository.name}/${branches.join(',')}\`
  
  *Commits:*
  ${commitsMessage.join('\n')}
  `.trim();

    return msg;
  }

  onEvent(message, project) {
    const { object_kind: objectKind, object_attributes: objectAttributes, build_status: buildStatus } = message.meta;
    if (objectKind === 'pipeline' && project.gitlab?.[`pipeline__${objectAttributes.status}`]) {
      return this.onPipeline(message);
    }
    if (objectKind === 'build' && project.gitlab?.[`build__${buildStatus}`]) {
      return this.onBuild(message);
    }
    if (objectKind === 'merge_request') {
      return this.onMergeRequest(message);
    }
    if (objectKind === 'push') {
      return this.onPush(message);
    }

    return null;
  }
  onReq2(req, { projectConfig }) {
    // Message.create()
    const message = {
      _id: Date.now() + Math.random(),
      createdAt: new Date(),
      type: 'manual',
      project: projectConfig.name,
      sended: false,
    };

    message.event = req.get('X-Gitlab-Event');
    message.type = 'gitlab';
    message.meta = req.body;
    const { object_kind: objectKind, ref, commits = [] } = message.meta;
    if (objectKind === 'push') {
      message.branch = ref.slice(ref.lastIndexOf('/') + 1);
      message.messageHash = crypto.MD5([commits.map((c) => c.id)].join('')).toString();
    }
    return message;
  }
}
