import { rl } from './console_interface';

export function introDiscussion(): Promise<string> {
  return new Promise((resolve) => {
    let userName: string = '';
    rl.question('Well hello there, enter your name young player! \n', (answer) => {
      userName = answer;
      console.log(`Hello ${answer}. let's play a little game`);
      console.log(
        "A number will be chosen for you between 1 and 100.\nYour goal is to find it with the hints that i'll give you",
      );
      console.log('Ready? GO!');
      resolve(userName);
    });
  });
}
