module.exports = process.env.STAGE === 'isuvorov' ? {
  pathexec: {
    paths: [
      // `/opt/homebrew/lib/node_modules/lsk/node_modules/@lskjs/cli-scripts`,
      `${__dirname}/libs-cli/cli-scripts`
    ],
  },
  cwd: __dirname,
} : process.env.STAGE === 'ci' ? {
  // pathexec: {
  //   paths: [
  //     // `/opt/homebrew/lib/node_modules/lsk/node_modules/@lskjs/cli-scripts`,
  //     `/lsk/libs-cli/cli-scripts`
  //   ],
  // },
  cwd: __dirname,
} : {
  cwd: __dirname,
};
