import { TestBed } from '@angular/core/testing';

import { GlobleValuesService } from './globle-values.service';

describe('GlobleValuesService', () => {
  let service: GlobleValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobleValuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
