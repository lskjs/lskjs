import monitoring from '.';

export default function getWarningMessage({ projectName, url, timeoutWarn }, provider) {
  return {
    projectName,
    md: monitoring.createMd(
      {
        level: 'warn',
        projectName,
        url,
        title: `TIMEOUT ${timeoutWarn}`,
      },
      provider,
    ),
  };
}
