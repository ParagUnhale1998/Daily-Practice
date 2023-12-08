import { CanActivateFn } from '@angular/router';

export const hotelOwnerGuard: CanActivateFn = (route, state) => {
  return true;
};
