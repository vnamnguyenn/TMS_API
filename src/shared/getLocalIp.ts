import os from 'os';
const networkInterfaces = os.networkInterfaces();
const networkInfo = networkInterfaces[Object.keys(networkInterfaces)[0]];
export const localIp = networkInfo?.find((address) => !address.internal && address.family === 'IPv4')?.address;
