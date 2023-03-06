import { ProfilePermission } from '~shared/auth/model/profile-permission.interface';

export interface ProfileRole {
  id: string;
  name: string;
  permissions: ProfilePermission[];
}
