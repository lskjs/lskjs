import BaseProvider from './BaseProvider';

export default class GithubProvider extends BaseProvider {
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
    let status;
    switch (buildStatus) {
      case 'success':
        status = '✅';
        break;
      case 'pending':
        status = '🕔';
        break;
      case 'failed':
        status = '❌';
        break;
      case 'canceled':
        status = '🙅‍♂️';
        break;
      case 'created':
        status = '🐣';
        break;
      case 'running':
        status = '🏃💨';
        break;
      default:
        status = `🤷‍♀️ ${buildStatus}`;
    }
    // const message2 = commit.message ? `\`${commit.message}\`\n` : '';
    // console.log('commit.author', commit.author);
    const msg = `\
    \`${projectName}\`
  ${status} *${buildName}*
  _${user.name}_
  ${repository.homepage}/-/jobs/${buildId}`;
    // this.sendMessageCI(process.env.CHAT_ID, message);
    return msg;
  }

  onPipeline(message) {
    const { commit, project, object_attributes: objectAttributes, user } = message.meta;
    let status;
    switch (objectAttributes.status) {
      case 'success':
        status = '✅';
        break;
      case 'pending':
        status = '🕔';
        break;
      case 'failed':
        status = '❌';
        break;
      case 'canceled':
        status = '🙅‍♂️';
        break;
      case 'created':
        status = '🐣';
        break;
      case 'running':
        status = '🏃💨';
        break;
      default:
        status = `🤷‍♀️ ${objectAttributes.status}`;
    }
    const message2 = commit.message ? `\`${commit.message}\`` : '';
    // console.log('commit.author', commit.author);
    const msg = `\
  ${status} ${project.name}/${objectAttributes.ref}
  @${user.username}
  ${message2}
  ${project.web_url}/pipelines/${objectAttributes.id}`;
    // this.sendMessageCI(process.env.CHAT_ID, message);
    return msg;
  }

  onMergeRequest(message) {
    const { user, object_attributes: objectAttributes } = message.meta;
    let status;
    switch (objectAttributes.state) {
      case 'opened':
        status = '🎉';
        break;
      case 'closed':
        status = '❌';
        break;
      case 'merged':
        status = '🤝';
        break;
      default:
        status = `🤷‍♀️ ${objectAttributes.status}`;
    }
    const message2 = objectAttributes.title ? `\`${objectAttributes.title}\`\n` : '';
    const msg = `\
  🍻 ${status} ${objectAttributes.state} ${objectAttributes.source_branch} -> ${objectAttributes.target_branch}
  @${user.username}
  ${message2}
  [${objectAttributes.url}](${objectAttributes.url})`;

    return msg;
  }

  onPush(message) {
    const { branch } = message;
    const { sender, repository = {}, commits = [] } = message.meta;

    const branches = [branch, ...(message.branches || [])];

    const commitsMessage = commits.map((commit) => {
      const short = commit.id.slice(0, 7);
      return `\
  [${short}](${commit.url}) _${commit.author?.name}_ 
  \`${commit.message}\``;
    });

    const msg = `\
  @${sender.login}
  Push to \`${repository.name}/${branches.join(',')}\`
  
  *Commits:*
  ${commitsMessage.join('\n')}
  `;

    return msg;
  }

  onEvent(message, { project }) {
    const { event } = message;
    const { object_attributes: objectAttributes, build_status: buildStatus } = message.meta;
    this.log.trace({ event });
    if (event === 'pipeline' && project.gitlab?.[`pipeline__${objectAttributes.status}`]) {
      return this.onPipeline(message);
    }
    if (event === 'build' && project.github?.[`build__${buildStatus}`]) {
      return this.onBuild(message);
    }
    if (event === 'pull_request') {
      return this.onMergeRequest(message);
    }
    if (event === 'push') {
      return this.onPush(message);
    }

    return null;
  }

  onReq(req, { projectConfig }) {
    const message = {
      _id: Date.now() + Math.random(),
      createdAt: new Date(),
      type: 'manual',
      project: projectConfig.name,
      sended: false,
    };

    message.event = req.get('X-Github-Event');
    message.type = 'github';
    message.meta = req.body;
    const { ref, commits = [] } = message.meta;
    if (message.event === 'push') {
      message.branch = ref.slice(ref.lastIndexOf('/') + 1);
      message.messageHash = crypto.MD5([commits.map((c) => c.id)].join('')).toString();
    }
    return message;
  }
}
