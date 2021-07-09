import monitoring from '.';

export default function getOtherErrorMessage({ projectName, url, err }) {
  return {
    projectName,
    text: monitoring.createMd({
      level: 'error',
      projectName,
      url,
      title: String(err),
    }),
  };
}
