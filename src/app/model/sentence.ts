export class Sentence {

  public code: number;
  // sentencetype:
  // = 1 Answer the question
  // = 2 Guess the word / setence
  public sentencetype: number;
  public sentence: string;
  public translationtospanish: string;

  constructor(code:number, sentencetype: number,
    sentence: string, translationtospanish: string) {
    this.code = code;
    this.sentence = sentence;
    this.sentencetype = sentencetype;
    this.translationtospanish = translationtospanish;
  }

}
