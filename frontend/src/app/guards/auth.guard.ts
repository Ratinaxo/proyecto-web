import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  if (authService.isLoggedIn() && user && user.isAdmin) {
    return true;
  }
  else if (authService.isLoggedIn()) {
    // Redirect to the home if the user is logged in but not an admin
    router.navigate(['/home']);
    return false;
  }
  else {
    // Redirect to the login page if the user is not logged in
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};
