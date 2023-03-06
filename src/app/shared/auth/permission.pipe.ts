import { Pipe, PipeTransform } from '@angular/core';

import { AppPermission } from '~shared/auth/model/app-permission.enum';
import { UserProfileService } from '~shared/auth/user-profile.service';

@Pipe({
  name: 'permission'
})
export class PermissionPipe implements PipeTransform {
  constructor(private userProfileService: UserProfileService) {}

  transform(permission: AppPermission): boolean {
    return this.userProfileService.hasPermission(permission);
  }
}
