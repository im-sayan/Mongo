const { log } = require('console');
const os = require('os');

console.log('System Information:');
console.log('-----------------------------------------');

console.log(`Platform: ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`CPU Cores: ${os.cpus().length}`);
console.log(`Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`);
console.log(`Hostname: ${os.hostname()}`);
console.log(`Network Interfaces: ${JSON.stringify(os.networkInterfaces())}`);
console.log(`Temporary Directory: ${os.tmpdir()}`);
console.log(`Endianness: ${os.endianness()}`);
console.log(`Uptime: ${os.uptime()} seconds`);
console.log(`Load Average: ${os.loadavg()}`);