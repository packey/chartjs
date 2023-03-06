import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { AppPermission } from '~shared/auth/model/app-permission.enum';
import { UserProfileService } from '~shared/auth/user-profile.service';
import { ROUTES } from '~shared/constants/routes';
import { PermissionGuard } from '~shared/guards/permission.guard';

describe('PermissionGuard', () => {
  let spectator: SpectatorService<PermissionGuard>;
  let createService = createServiceFactory({
    service: PermissionGuard,
    imports: [RouterTestingModule],
    providers: [MockProvider(UserProfileService), MockProvider(AuthService)]
  });

  let userProfileService: SpyObject<UserProfileService>;

  beforeEach(() => {
    spectator = createService();

    userProfileService = spectator.inject(UserProfileService);
  });

  it('should create', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should return true when route is permitted', () => {
    userProfileService.hasPermission.withArgs(AppPermission.ReadUsers).and.returnValue(true);

    const result = spectator.service.canActivate({ data: { permission: AppPermission.ReadUsers } } as any);

    expect(result).toBeTrue();
  });

  it('should return true when route requires no permission', () => {
    userProfileService.hasPermission.and.returnValue(true);

    const result = spectator.service.canActivate({} as any);

    expect(result).toBeTrue();
  });

  it('should redirect to Not Found when route is not permitted', () => {
    userProfileService.hasPermission.withArgs(AppPermission.ReadUsers).and.returnValue(false);

    const result = spectator.service.canActivate({ data: { permission: AppPermission.ReadUsers } } as any);

    expect(result).toBeInstanceOf(UrlTree);
    expect((result as UrlTree).toString()).toBe(ROUTES.NOT_FOUND.url);
  });
});
