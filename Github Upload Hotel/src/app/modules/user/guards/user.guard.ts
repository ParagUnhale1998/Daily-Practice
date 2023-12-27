import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _authServie = inject(AuthService);

  if(_authServie.isAuthenticated()){
    return true;
  }
  else{
    _router.navigateByUrl('user/login')
    return false;
  }

};
