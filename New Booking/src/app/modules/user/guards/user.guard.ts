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
/*canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(
      take(1), // Ensure the observable completes after the first emission
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('user/login');
          return false;
        }
      })
    );
  }*/