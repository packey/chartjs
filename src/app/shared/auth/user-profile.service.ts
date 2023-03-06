import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';

import { AppPermission } from '~shared/auth/model/app-permission.enum';
import { ProfilePermission } from '~shared/auth/model/profile-permission.interface';
import { UserProfile } from '~shared/auth/model/user-profile.interface';
import { UserProfileApi } from '~shared/auth/user-profile-api.service';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private _permissions: Map<string, ProfilePermission> = new Map();
  private _profile: UserProfile | null = null;

  get profile(): UserProfile {
    if (this._profile == null) {
      throw new Error('Profile is not loaded yet.');
    }

    return this._profile;
  }

  constructor(private userProfileApi: UserProfileApi, private authService: AuthService) {}

  hasPermission(permission: AppPermission | null): boolean {
    return permission == null || this._permissions.has(permission);
  }

  hasSomePermissions(...permissions: AppPermission[]): boolean {
    return permissions.some(permission => this.hasPermission(permission));
  }

  loadProfile(): Observable<UserProfile> {
    const loadProfile$ = this.userProfileApi.getMyProfile().pipe(
      withLatestFrom(this.authService.user$),
      map(([profile, token]) => this.enrichWithTokenInfo(profile, token!)),
      tap(profile => this.setProfile(profile))
    );

    return this._profile == null ? loadProfile$ : of(this._profile);
  }

  private setProfile(profile: UserProfile) {
    this._profile = profile;

    // Get a list of distinct permissions
    profile.roles
      .flatMap(role => role.permissions)
      .forEach(permission => this._permissions.set(permission.id, permission));
  }

  private enrichWithTokenInfo(profile: UserProfile, token: User) {
    let name = token.name || token.email;
    if (token.given_name != null && token.family_name != null) {
      name = `${token.given_name} ${token.family_name}`;
    }

    return { ...profile, name };
  }
}
