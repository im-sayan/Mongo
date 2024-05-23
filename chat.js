const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const users = {};


function broadcast(message) {
  for (const userId in users) {
    users[userId].write(`${message}\n`);
  }
}

function handleInput(input) {
  const [userId, message] = input.split(': ');
  if (!users[userId]) {
    users[userId] = rl;
    broadcast(`${userId} has joined the chat`);
  }
  broadcast(`${userId}: ${message}`);
}

rl.on('line', handleInput);

console.log('Welcome to the chat system!');
console.log('Enter your username followed by a colon and your message, e.g. "alice: hello world"');