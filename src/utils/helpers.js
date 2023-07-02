export function IsDeviceOnline(data) {
  return !true;
}

export function getDeviceIDForUI(device) {
  return device._id.slice(-5);
}

export function hidePassword(pwd) {
  pwd = pwd.replace(/./g, "*");
  return pwd;
}
