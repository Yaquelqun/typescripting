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

  constructor(number: number, remainingTries: number) {
    this.chosenNumber = number;
    this.remainingTries = remainingTries;
  }

  public async run(): Promise<void> {
    if (await this.manage_loss()) return;

    const answer = await this.ask_question();
    switch (this.spaceship(this.chosenNumber, answer)) {
      case 0:
        this.trigger_win();
        return;
      case 1:
        console.log('lower !');
        await this.manage_remaining_tries();
        await this.run();
        break;
      case -1:
        console.log('higher !');
        await this.manage_remaining_tries();
        await this.run();
        break;
    }
  }

  private async manage_loss(): Promise<boolean> {
    if (this.remainingTries === 0) {
      console.log('dammit, you lost');
      return true;
    }
    return false;
  }

  private async manage_remaining_tries() {
    this.remainingTries = this.remainingTries - 1;
  }

  private trigger_win() {
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
      rl.question(`Please enter a guess, remaining guesses: ${this.remainingTries}\n`, (answer) => {
        resolve(parseInt(answer, 10));
      });
    });
  }
}
