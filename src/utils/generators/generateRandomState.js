export function generateSecureRandomState(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from(array)
    .map((x) => chars[x % chars.length])
    .join('');
}
