import { TestBed } from '@angular/core/testing';

import { OwnerDataService } from './owner-data.service';

describe('OwnerDataService', () => {
  let service: OwnerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
