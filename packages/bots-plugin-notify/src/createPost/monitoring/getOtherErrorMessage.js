import monitoring from '.';

export default function getOtherErrorMessage({ projectName, url, err }, provider) {
  return {
    projectName,
    text: monitoring.createMd(
      {
        level: 'error',
        projectName,
        url,
        title: String(err),
      },
      provider,
    ),
    isMd: true,
  };
}
