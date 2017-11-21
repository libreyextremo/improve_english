import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    Speechrecognition: any;
}

@Injectable()
export class SpeechrecognitionService {

  speechrecognition: any;

  constructor(private zone: NgZone) { }

  record(): Observable<string> {

      return Observable.create(observer => {
          const { webkitSpeechRecognition }: IWindow = <IWindow>window;
          this.speechrecognition = new webkitSpeechRecognition();
          this.speechrecognition.continuous = true;
          //this.speechrecognition.interimResults = true;
          this.speechrecognition.lang = 'en-us';
          this.speechrecognition.maxAlternatives = 1;

          this.speechrecognition.onresult = speech => {
              let term: string = "";
              if (speech.results) {
                  var result = speech.results[speech.resultIndex];
                  var transcript = result[0].transcript;
                  if (result.isFinal) {
                      if (result[0].confidence < 0.3) {
                          console.log("Unrecognized result - Please try again");
                      }
                      else {
                          term = _.trim(transcript);
                          console.log("Did you said? -> " + term + " , If not then say something else...");
                      }
                  }
              }
              this.zone.run(() => {
                  observer.next(term);
              });
          };

          this.speechrecognition.onerror = error => {
              console.log("error" + error);
              observer.error(error);
          };

          this.speechrecognition.onend = () => {
              console.log("Complete");
              observer.complete();
          };

          this.speechrecognition.start();
          console.log("Say something - speech recognition is listening");
      });
  }

  DestroySpeechObject() {
      if (this.speechrecognition)
          console.log("Stop");
          this.speechrecognition.stop();
  }

}
