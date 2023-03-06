import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { UserProfileService } from '~shared/auth/user-profile.service';
import { ROUTES } from '~shared/constants/routes';
import { DefaultRouteGuard } from '~shared/guards/default-route.guard';

describe('DefaultRouteGuard', () => {
  let spectator: SpectatorService<DefaultRouteGuard>;
  let createService = createServiceFactory({
    service: DefaultRouteGuard,
    imports: [RouterTestingModule],
    providers: [MockProvider(UserProfileService)]
  });

  let userProfileService: SpyObject<UserProfileService>;

  beforeEach(() => {
    spectator = createService();

    userProfileService = spectator.inject(UserProfileService);
  });

  it('should create', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should redirect to Not Found when no menu items are permitted', () => {
    userProfileService.hasPermission.and.returnValue(false);

    const result = spectator.service.canActivate();

    expect(result).toBeInstanceOf(UrlTree);
    expect((result as UrlTree).toString()).toEqual(ROUTES.NOT_FOUND.url);
  });

  it('should redirect to first permitted menu item', () => {
    userProfileService.hasPermission.and.returnValue(true).withArgs(null).and.returnValue(false);

    const result = spectator.service.canActivate();

    expect(result).toBeInstanceOf(UrlTree);
    expect((result as UrlTree).toString()).toEqual(ROUTES.INSTRUMENTS.url);
  });
});
