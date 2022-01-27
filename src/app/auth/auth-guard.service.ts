import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private isAuthenticated = false;
  private hasUserData = false;

  constructor(
    private authService: AuthService,
    private userDataService: UserDataService
  ) {
    this.authService.isAuthenticated.subscribe(i => this.isAuthenticated = i);
    this.userDataService.getUserDataUpdatedListener().subscribe(i => this.hasUserData = i);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {

    return this.authService.isDoneLoading
      .pipe(filter(isDone => isDone))
      .pipe(tap(_ => this.isAuthenticated || this.authService.login(state.url)))
      .pipe(tap(_ => {
        if (this.isAuthenticated && !this.hasUserData) {
          this.userDataService.loadFxUser(this.authService.getUserClaim());
        }
      }))
      .pipe(map(_ => this.isAuthenticated && this.hasUserData));
  }
}
