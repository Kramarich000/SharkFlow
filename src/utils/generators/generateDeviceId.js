export const generateDeviceId = () => {
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    deviceId = deviceId.toLowerCase();
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
};
