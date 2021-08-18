import monitoring from '.';

export default function getEconnabortedErrorMessage({ projectName, url, timeout }, provider) {
  return {
    projectName,
    md: monitoring.createMd(
      {
        level: 'error',
        projectName,
        url,
        title: `TIMEOUT ${timeout}`,
      },
      provider,
    ),
  };
}
