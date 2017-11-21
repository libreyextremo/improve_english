import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Sentence } from './model/sentence';
import { Sentencegenerator } from './model/sentencegenerator';
import { SpeechrecognitionService } from './speechrecognition.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // VARIABLES
  formEnglish: FormGroup;
  questionShowed:boolean = false;
  question: string = "What is your name?";
  sg: Sentencegenerator;
  pathShowIcon: string = '..\\assets\\img\\icon_ballon_hidden.png';
  speechData: string;
  title: string = "Answer the question";

  // CONSTRUCTOR
  constructor(private speechrecognitionService: SpeechrecognitionService) {
      this.speechData = "";
  }

  // EVENTS
  ngOnInit() {
    this.formEnglish = new FormGroup({
      answer: new FormControl("")
    });
    this.pathShowIcon = '..\\assets\\img\\icon_balloon_hidden.png';
    this.sg = new Sentencegenerator();
    this.updateControls();
    this.activateSpeechListening();
  }

  ngOnDestroy() {
    this.speechrecognitionService.DestroySpeechObject();
  }

  ngAfterViewInit() {
    this.speakQuestion();
  }

  // PRIVATE METHODS
  showQuestion() {
    this.questionShowed = !this.questionShowed;
    if (this.questionShowed) {
      this.pathShowIcon = '..\\assets\\img\\icon_balloon_showed.png';
    } else {
      this.pathShowIcon = '..\\assets\\img\\icon_balloon_hidden.png';
    }
  }

  repeatQuestion() {
    this.speakQuestion();
  }

  nextQuestion() {
    this.speechData = "";
    this.updateControls();
    this.speakQuestion();
  }

  updateControls() {
    var s: Sentence = this.sg.getRandomSentence();
    this.question = s.sentence;
    if (s.sentencetype == 1) {
      this.title = "Answer the question";
    } else if (s.sentencetype == 2) {
      this.title = "Guess the word or the sentence";
    }

  }

  speakQuestion() {
    this.delay(2000); // wait one second
    var msg = new SpeechSynthesisUtterance(this.question);
    window.speechSynthesis.speak(msg);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // SPEECH RECOGNITION METHOD
  activateSpeechListening(): void {
    this.speechrecognitionService.record()
      .subscribe(
      //listener
      (value) => {
          this.speechData = value;
          console.log(value);
      },
      //errror
      (err) => {
          console.log(err);
          if (err.error == "no-speech") {
              console.log("--restarting service--");
              this.activateSpeechListening();
          }
      },
      //completion
      () => {
          console.log("--complete--");
          this.activateSpeechListening();
      });
    }

}
