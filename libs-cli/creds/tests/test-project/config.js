const path = require('path');

module.exports = {
  service: {
    serviceName: 'github', // github, gitlab
    token: 'TOKEN',
    projectPath: 'user/repo',

    // serviceName: 'gitlab',
    // token: 'TOKEN',
    // projectPath: 'user/repo',
    // projectId: 71,
    // server: 'gitlab.example.com',
  },
  secrets: {
    very_secret: 'foo',
  },
  variables: {
    not_very_secret: 'variable',
  },
  hooks: [
    {
      url: 'https://example.com/gitlab-notify',
      push_events: true,
      tag_push_events: true,
      merge_requests_events: true,
      repository_update_events: false,
      enable_ssl_verification: true,
      alert_status: 'executable',
      disabled_until: null,
      url_variables: [],
      project_id: 71,
      issues_events: true,
      confidential_issues_events: true,
      note_events: true,
      confidential_note_events: true,
      pipeline_events: true,
      wiki_page_events: true,
      deployment_events: true,
      job_events: true,
      releases_events: false,
      push_events_branch_filter: '',
      emoji_events: false
    },
  ],
  files: [
    {
      credType: 'secret',
      name: 'test_secret',
      filename: 'test_secret.js',
      type: 'js',
      stage: 'testing',
      isLocal: false,
      handler: (config) => require(path.join(__dirname, config.filename)),
    },
    {
      credType: 'variable',
      name: 'test_variable',
      filename: 'test_variable.js',
      type: 'js',
      stage: 'testing',
      isLocal: false,
      handler: (config) => require(path.join(__dirname, config.filename)),
    },
  ],
};
