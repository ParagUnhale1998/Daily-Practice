import { CanActivateFn, Router } from '@angular/router';
import { OwnerAuthService } from '../services/owner-auth.service';
import { inject } from '@angular/core';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

export const hotelOwnerGuard: CanActivateFn = (route, state) => {
  const TOKEN_KEY = 'authToken';

  const _router = inject(Router);
  const _authServie = inject(OwnerAuthService);
  const _sessionStorageService = inject(SessionStorageService);
  const token = _sessionStorageService.get(TOKEN_KEY);

  if (token && _authServie.isAuthenticated(token)) {
    return true;
  } else {
    _router.navigateByUrl('owner/login');
    return false;
  }
};