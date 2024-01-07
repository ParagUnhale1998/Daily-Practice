import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hotelOwnerGuard } from './hotel-owner.guard';

describe('hotelOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hotelOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
