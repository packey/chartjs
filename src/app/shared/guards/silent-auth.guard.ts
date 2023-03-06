import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, take } from 'rxjs/operators';

import { UserProfileService } from '~shared/auth/user-profile.service';
import { ROUTES } from '~shared/constants/routes';

@Injectable({
  providedIn: 'root'
})
export class SilentAuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(private auth: AuthService, private profileService: UserProfileService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(take(1));
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.refreshIfUnauthenticated(state).pipe(
      concatMap(isLoggedIn => this.loadProfileIfAuthenticated(isLoggedIn))
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.refreshIfUnauthenticated(state);
  }

  private refreshIfUnauthenticated(state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAuthenticated$.pipe(
      switchMap(isLoggedIn => {
        let requestToken$ = this.auth.getAccessTokenSilently().pipe(map(() => true));

        return isLoggedIn ? of(isLoggedIn) : requestToken$;
      }),
      catchError(() =>
        this.auth
          .loginWithRedirect({
            appState: { target: state.url }
          })
          .pipe(map(() => false))
      ),
      take(1)
    );
  }

  private loadProfileIfAuthenticated(isLoggedIn: boolean): Observable<boolean | UrlTree> {
    let requestProfile$ = this.profileService.loadProfile().pipe(
      map(() => true),
      catchError(error => this.handleProfileError(error))
    );

    return isLoggedIn ? requestProfile$ : of(isLoggedIn);
  }

  private handleProfileError(response: HttpErrorResponse): Observable<any> {
    const authErrorCodes = [401, 403];
    const isAuthError = authErrorCodes.includes(response.status);
    const redirectUrl = isAuthError ? ROUTES.NOT_FOUND_NO_PROFILE.url : ROUTES.FATAL_ERROR.url;

    return of(this.router.parseUrl(redirectUrl));
  }
}
