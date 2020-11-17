import { rl } from './console_interface';

// Promisified version of rl.question
function question(text: string): string {
  return new Promise((resolve) => rl.question(text, resolve));
}

export class Game {
  constructor(
    private _chosenNumber: number, 
    private _remainingTries: number
  ) {}
  
  get playerDefeated() {
    return this._remainingTries === 0;
  }
  
  public async run(): Promise<void> {
    if (this.playerDefeated) {
      console.log('dammit, you lost');
      return;
    }
    
    const answer = await this._askQuestion();
    const result = answer - this._chosenNumber;
    
    if (result < 0) {
      console.log('higher !');
      this._newTry();
    } else if (result > 0) {
      console.log('lower !');
      this._newTry();
    } else {
      this._triggerWin();
    }
  }
  
  private _newTry(): void {
    this._remainingTries -= 1;
    this.run();
  }
  
  private _triggerWin(): void {
    console.log('omg you won !');
  }
  
  private async _askQuestion(): Promise<number> {
    const answer = await question(`Please enter a guess, remaining guesses: ${this.remainingTries}\n`);
    return parseInt(answer, 10);
  }
}
