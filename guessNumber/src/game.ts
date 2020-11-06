import { rl } from './console_interface';

export enum GameStatus {
  INITIATED,
  ONGOING,
  WON,
  LOST,
}

export class Game {
  chosenNumber: number;
  remainingTries: number;
  status: GameStatus.INITIATED;

  constructor(number: number, remainingTries: number) {
    this.chosenNumber = number;
    this.remainingTries = remainingTries;
    this.status = GameStatus.INITIATED;
  }

  public async run(): Promise<void> {
    console.log('what');
    const answer = await this.ask_question();

    switch (this.spaceship(this.chosenNumber, answer)) {
      case 0:
        this.trigger_win();
        return;
      case 1:
        console.log('lower !');
        await this.run();
        break;
      case -1:
        console.log('higher !');
        await this.run();
        break;
    }
  }

  trigger_win() {
    console.log('omg you won !');
  }

  private spaceship(a: number, b: number): number {
    if (a > b) return -1;
    if (a < b) return 1;
    if (a === b) return 0;

    return 0;
  }

  private ask_question(): Promise<number> {
    return new Promise((resolve) => {
      rl.question('Please enter a guess \n', (answer) => {
        resolve(parseInt(answer, 10));
      });
    });
  }
}
