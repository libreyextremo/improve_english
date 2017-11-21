import { TestBed, inject } from '@angular/core/testing';

import { SpeechrecognitionService } from './speechrecognition.service';

describe('SpeechrecognitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeechrecognitionService]
    });
  });

  it('should be created', inject([SpeechrecognitionService], (service: SpeechrecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
