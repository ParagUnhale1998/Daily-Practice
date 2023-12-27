import { TestBed } from '@angular/core/testing';

import { FakeJwtService } from './fake-jwt.service';

describe('FakeJwtService', () => {
  let service: FakeJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
