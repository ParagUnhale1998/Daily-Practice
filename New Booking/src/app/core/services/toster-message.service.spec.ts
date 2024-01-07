import { TestBed } from '@angular/core/testing';

import { TosterMessageService } from './toster-message.service';

describe('TosterMessageService', () => {
  let service: TosterMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TosterMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
