import monitoring from '.';

export default function getEconnabortedErrorMessage({ projectName, url, timeout }) {
  return {
    projectName,
    md: monitoring.createMd({
      level: 'error',
      projectName,
      url,
      title: `TIMEOUT ${timeout}`,
    }),
  };
}
