import { UAParser } from "ua-parser-js";

export async function detectBrowserInfo() {
  const isBrowser =
    typeof window !== 'undefined' && typeof navigator !== 'undefined';
  if (!isBrowser) return { isBrowser: false };

  const parser = new UAParser();
  const result = parser.getResult();

  async function checkIncognito() {
    if (!window.webkitRequestFileSystem && !window.RequestFileSystem)
      return false;
    return new Promise((resolve) => {
      const on = () => resolve(false);
      const off = () => resolve(true);
      if (window.webkitRequestFileSystem) {
        window.webkitRequestFileSystem(window.TEMPORARY, 100, on, off);
      } else if (window.RequestFileSystem) {
        window.RequestFileSystem(window.TEMPORARY, 100, on, off);
      } else {
        resolve(false);
      }
    });
  }
  const isIncognito = await checkIncognito();

  return {
    isBrowser: true,
    browserName: result.browser.name || 'unknown',
    browserVersion: result.browser.version || 'unknown',
    osName: result.os.name || 'unknown',
    osVersion: result.os.version || 'unknown',
    deviceType: result.device.type || 'desktop',
    deviceVendor: result.device.vendor || 'unknown',
    isIncognito,
    language: navigator.language || navigator.userLanguage || 'unknown',
    platform: navigator.platform || 'unknown',
    userAgent: navigator.userAgent,
  };
}
