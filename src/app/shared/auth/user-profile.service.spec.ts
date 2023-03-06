import { fakeAsync } from '@angular/core/testing';
import { AuthService, User } from '@auth0/auth0-angular';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';
import { BehaviorSubject, of, throwError } from 'rxjs';

import { AppPermission } from '~shared/auth/model/app-permission.enum';
import { UserProfile } from '~shared/auth/model/user-profile.interface';
import { UserProfileApi } from '~shared/auth/user-profile-api.service';
import { UserProfileService } from '~shared/auth/user-profile.service';
import { userProfileStub } from '~shared/mocks/user-profile.stub';

describe('UserProfileService', () => {
  let user$ = new BehaviorSubject<User | null>(null);

  let createService = createServiceFactory({
    service: UserProfileService,
    imports: [],
    providers: [
      MockProvider(UserProfileApi),
      MockProvider(AuthService, {
        user$: user$
      })
    ]
  });

  let spectator: SpectatorService<UserProfileService>;
  let userProfileApi: SpyObject<UserProfileApi>;
  let service: UserProfileService;

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
    user$.next({ name: 'test' });
    userProfileApi = spectator.inject(UserProfileApi);
    userProfileApi.getMyProfile.and.returnValue(of(userProfileStub));
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  it('should load profile', fakeAsync(() => {
    service.loadProfile().subscribe();

    expect(service.profile).toEqual({ ...userProfileStub, name: 'test' });
  }));

  it('should generate name based on given name and family name when available', fakeAsync(() => {
    user$.next({ given_name: 'John', family_name: 'Doe' });
    service.loadProfile().subscribe();

    expect(service.profile).toEqual({ ...userProfileStub, name: 'John Doe' });
  }));

  it('should generate name based on email when name given name and family name are not available', fakeAsync(() => {
    user$.next({ email: 'john.doe@tecan.net' });
    service.loadProfile().subscribe();

    expect(service.profile).toEqual({ ...userProfileStub, name: 'john.doe@tecan.net' });
  }));

  it('should skip loading profile if it is already loaded', fakeAsync(() => {
    service.loadProfile().subscribe();
    userProfileApi.getMyProfile.and.returnValue(throwError(() => new Error()));

    service.loadProfile().subscribe();

    expect(service.profile).toEqual({ ...userProfileStub, name: 'test' });
  }));

  it('should check if the user has a permission', fakeAsync(() => {
    service.loadProfile().subscribe();

    expect(service.hasPermission(AppPermission.CreateUsers)).toBe(true);
  }));

  it('should check if the user lacks a permission', fakeAsync(() => {
    userProfileApi.getMyProfile.and.returnValue(of({ ...userProfileStub, roles: [] }));
    service.loadProfile().subscribe();

    expect(service.hasPermission(AppPermission.CreateUsers)).toBe(false);
  }));

  it('should not allow accessing the profile when it is not loaded', () => {
    expect(() => service.profile).toThrow();
  });

  describe('hasSomePermissions', () => {
    beforeEach(fakeAsync(() => {
      const profile: UserProfile = {
        ...userProfileStub
      };
      profile.roles[0].permissions.pop();

      userProfileApi.getMyProfile.and.returnValue(of(profile));
      service.loadProfile().subscribe();
    }));

    it('should return true when the user has one of the provided permissions', () => {
      expect(service.hasSomePermissions(AppPermission.ReadUsers, AppPermission.DeleteUsers)).toBeTrue();
    });

    it('should return false when the user has none of the provided permissions', () => {
      expect(service.hasSomePermissions(AppPermission.DeleteUsers)).toBeFalse();
    });
  });
});
