import { introDiscussion } from './discussions';
import { Game } from './game';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function main() {
  await introDiscussion();
  const game = new Game(getRandomInt(100), 10);
  await game.run();
  process.exit();
}

main();

// end of game choices
// discussion.ending
