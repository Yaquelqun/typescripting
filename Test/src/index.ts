import readline from 'readline';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Well hello there, enter your name ! \n', (answer) => {
  console.log(`Hello ${answer}`);
});
