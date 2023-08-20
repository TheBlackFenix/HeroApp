import { Injectable, inject } from '@angular/core';
import { CanMatchFn, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';



const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.ckeckStatus().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    );
  };

export const canActivateGuard: CanActivateFn = ( 
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return checkAuthStatus();
};

const checkAuthStatusPublic = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.ckeckStatus().pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['./']);
        }
      }),
      map(isAutenticated => !isAutenticated)
    );
  };

export const canActivatePublic: CanActivateFn = ( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    console.log(checkAuthStatusPublic())
    return checkAuthStatusPublic();
  };

export const canMatchPublic: CanMatchFn = (
route: Route,
segments: UrlSegment[]
) => {
    console.log(checkAuthStatusPublic())
    return checkAuthStatusPublic();
};