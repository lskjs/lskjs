import monitoring from '.';

export default function getRedirectErrorMessage({ projectName, url }) {
  return {
    projectName,
    md: monitoring.createMd({
      level: 'error',
      projectName,
      url,
      title: 'status >= 300',
    }),
  };
}
