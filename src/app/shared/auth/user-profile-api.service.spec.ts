import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync } from '@angular/core/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { UserProfileApi } from '~shared/auth/user-profile-api.service';
import { AppConfigService } from '~shared/configuration/app-config.service';
import { userProfileStub } from '~shared/mocks/user-profile.stub';

describe('UserProfileApi', () => {
  let createService = createServiceFactory({
    service: UserProfileApi,
    imports: [HttpClientTestingModule],
    providers: [MockProvider(AppConfigService, { baseApiPath: 'api' })]
  });

  let spectator: SpectatorService<UserProfileApi>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    spectator = createService();
    httpController = spectator.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should request my profile', fakeAsync(() => {
    let actual: any;
    spectator.service.getMyProfile().subscribe(result => (actual = result));

    const request = httpController.expectOne('api/Users/me');
    request.flush(userProfileStub);

    expect(actual).toBe(userProfileStub);
  }));
});
