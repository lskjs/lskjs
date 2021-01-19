export function maskUriPassword(uri = ''): string {
  return uri.replace(/:.+@/, '@');
}

export default maskUriPassword;
