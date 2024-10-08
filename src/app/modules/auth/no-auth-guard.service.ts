import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


import { map ,  take } from 'rxjs/operators';
import { UserService } from 'src/app/core';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userService.populate();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => {
      if (isAuth) {
        this.router.navigate(['']);
      }
      return !isAuth;
    }));

  }
}
