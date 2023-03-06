import { HttpErrorResponse } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';
import { BehaviorSubject, of, throwError } from 'rxjs';

import { UserProfileService } from '~shared/auth/user-profile.service';
import { ROUTES } from '~shared/constants/routes';
import { SilentAuthGuard } from '~shared/guards/silent-auth.guard';
import { userProfileStub } from '~shared/mocks/user-profile.stub';

describe('SilentAuthGuard', () => {
  let spectator: SpectatorService<SilentAuthGuard>;
  const isAuthenticated$ = new BehaviorSubject(true);
  const routerStateMock: any = {};
  const activatedRouteSnapshotMock: any = {};
  const createService = createServiceFactory({
    service: SilentAuthGuard,
    imports: [RouterTestingModule],
    providers: [
      MockProvider(AuthService, {
        isAuthenticated$
      }),
      MockProvider(UserProfileService)
    ]
  });
  let authService: SpyObject<AuthService>;
  let userProfileService: SpyObject<UserProfileService>;

  beforeEach(() => {
    spectator = createService();
    authService = spectator.inject<any>(AuthService);
    authService.getAccessTokenSilently.and.returnValue(of(''));
    authService.loginWithRedirect.and.returnValue(of({}));

    userProfileService = spectator.inject(UserProfileService);
    userProfileService.loadProfile.and.returnValue(of(userProfileStub));

    isAuthenticated$.next(true);
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('canLoad', () => {
    it('should return true when user is authenticated', () => {
      const actual$ = new BehaviorSubject(false);

      spectator.service.canLoad().subscribe(actual$);

      expect(actual$.value).toBe(true);
    });

    it('should return false when user is not authenticated', () => {
      const actual$ = new BehaviorSubject(true);
      isAuthenticated$.next(false);

      spectator.service.canLoad().subscribe(actual$);

      expect(actual$.value).toBe(false);
    });
  });

  describe('canActivate', () => {
    it('should return true when user is authenticated', fakeAsync(() => {
      const actual$ = new BehaviorSubject<UrlTree | boolean>(false);

      spectator.service.canActivate(activatedRouteSnapshotMock, routerStateMock).subscribe(actual$);

      expect(actual$.value).toBe(true);
    }));

    it('should return false and redirect when user refreshing fails', fakeAsync(() => {
      const actual$ = new BehaviorSubject<UrlTree | boolean>(false);
      isAuthenticated$.next(false);
      authService.getAccessTokenSilently.and.returnValue(throwError(() => new Error()));

      spectator.service.canActivate(activatedRouteSnapshotMock, routerStateMock).subscribe(actual$);

      expect(actual$.value).toBe(false);
      expect(authService.getAccessTokenSilently).toHaveBeenCalled();
      expect(authService.loginWithRedirect).toHaveBeenCalled();
    }));

    it('should return true when user is not authenticated and refreshing succeeds', fakeAsync(() => {
      const actual$ = new BehaviorSubject<UrlTree | boolean>(false);
      isAuthenticated$.next(false);

      spectator.service.canActivate(activatedRouteSnapshotMock, routerStateMock).subscribe(actual$);

      expect(actual$.value).toBe(true);
      expect(authService.getAccessTokenSilently).toHaveBeenCalled();
      expect(authService.loginWithRedirect).not.toHaveBeenCalled();
    }));

    it('should load user profile when user is logged in', fakeAsync(() => {
      const actual$ = new BehaviorSubject<UrlTree | boolean>(false);
      isAuthenticated$.next(true);

      spectator.service.canActivate(activatedRouteSnapshotMock, routerStateMock).subscribe(actual$);

      expect(userProfileService.loadProfile).toHaveBeenCalledTimes(1);
      expect(actual$.value).toBe(true);
    }));

    it('should skip loading the user profile when access token cannot be refreshed silently', fakeAsync(() => {
      const actual$ = new BehaviorSubject<UrlTree | boolean>(false);
      isAuthenticated$.next(false);
      authService.getAccessTokenSilently.and.returnValue(throwError(() => new Error()));
      userProfileService.loadProfile.and.returnValue(throwError(() => new Error()));

      spectator.service.canActivate(activatedRouteSnapshotMock, routerStateMock).subscribe(actual$);

      expect(actual$.value).toBe(false);
    }));

    it('should redirect to fatal error page when loading the user profile fails', fakeAsync(() => {
      const actual$ = new BehaviorSubject<UrlTree | boolean>(false);
      isAuthenticated$.next(true);
      userProfileService.loadProfile.and.returnValue(throwError(() => new Error()));

      spectator.service.canActivate(activatedRouteSnapshotMock, routerStateMock).subscribe(actual$);

      expect(actual$.value.toString()).toBe(ROUTES.FATAL_ERROR.url);
    }));

    it('should redirect to not found  page when loading the user profile fails because of auth', fakeAsync(() => {
      const actual$ = new BehaviorSubject<UrlTree | boolean>(false);
      isAuthenticated$.next(true);
      userProfileService.loadProfile.and.returnValue(throwError(() => new HttpErrorResponse({ status: 403 })));

      spectator.service.canActivate(activatedRouteSnapshotMock, routerStateMock).subscribe(actual$);

      expect(actual$.value.toString()).toBe(ROUTES.NOT_FOUND_NO_PROFILE.url);
    }));
  });

  describe('canActivateChild', () => {
    it('should return true when user is authenticated', () => {
      const actual$ = new BehaviorSubject(false);

      spectator.service.canActivateChild(activatedRouteSnapshotMock, routerStateMock).subscribe(actual$);

      expect(actual$.value).toBe(true);
    });
  });
});
