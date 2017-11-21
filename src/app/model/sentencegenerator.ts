import { Sentence } from './sentence';

export class Sentencegenerator {

  MAX:number = 6;

  constructor() { }

  getRandomSentence(): Sentence {
    let random = this.getRandomFrom1ToX(this.MAX);
    return this.getSentenceI(random);
  }

  private getRandomFrom1ToX(x: number): number {
    return Math.floor(Math.random() * x) + 1;
  }

  private getSentenceI(i: number): Sentence {
    var s: Sentence;
    switch (i) {
      case 1:
        s = new Sentence(1, 1, 'What is your name?', '¿Cuál es tu nombre?');
        break;
      case 2:
        s = new Sentence(2, 1, 'What is your profession?', '¿A qué te dedicas?');
        break;
      case 3:
        s = new Sentence(3, 1, 'What do you do for a living?', '¿A qué te dedicas?');
        break;
      case 4:
        s = new Sentence(4, 1, 'Where did you last go on holiday?', '¿A donde fuiste la ultima vez de vacaciones?');
        break;
      case 5:
        s = new Sentence(5, 1, 'How many countries have you been to?', '¿En cuántos países has estado?');
        break;
      case 6:
        s = new Sentence(6, 1, 'What is your favorite food?', '¿Cuál es tu comida favorita?');
        break;
    }
    return s;
  }


}
