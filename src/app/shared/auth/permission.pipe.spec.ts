import { SpyObject, createSpyObject } from '@ngneat/spectator';

import { AppPermission } from '~shared/auth/model/app-permission.enum';
import { PermissionPipe } from '~shared/auth/permission.pipe';
import { UserProfileService } from '~shared/auth/user-profile.service';

describe('PermisssionPipe', () => {
  let userProfileService: SpyObject<UserProfileService>;
  let pipe: PermissionPipe;

  beforeEach(() => {
    userProfileService = createSpyObject(UserProfileService);
    pipe = new PermissionPipe(userProfileService);
  });

  it('should create', () => {
    expect(pipe).toBeDefined();
  });

  it('should return true when permission is available', () => {
    userProfileService.hasPermission.and.returnValue(true);

    expect(pipe.transform(AppPermission.CreateUsers)).toBe(true);
    expect(userProfileService.hasPermission).toHaveBeenCalledOnceWith(AppPermission.CreateUsers);
  });

  it('should return false when permission is not available', () => {
    userProfileService.hasPermission.and.returnValue(false);

    expect(pipe.transform(AppPermission.CreateUsers)).toBe(false);
    expect(userProfileService.hasPermission).toHaveBeenCalledOnceWith(AppPermission.CreateUsers);
  });
});
