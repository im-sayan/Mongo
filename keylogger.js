const fs = require('fs');
const keypress = require('keypress');

// Create a write stream to store the keystrokes in a file
const logStream = fs.createWriteStream('keystrokes.log', { flags: 'a' });

// Initialize keypress
keypress(process.stdin);

// Listen for keypress events
process.stdin.on('keypress', function (ch, key) {
  if (key) {
    // Log the key to the console (optional)
    console.log('Keypress:', key.name);
    
    // Write the key to the log file followed by a newline
    logStream.write(key.name + '\n');
    
    // Handle special keys like Enter/Return
    if (key && key.ctrl && key.name === 'c') {
      process.stdin.pause();
    }
  }
});

// Enable stdin to emit events
process.stdin.setRawMode(true);
process.stdin.resume();
