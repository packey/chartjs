import { ProfileRole } from '~shared/auth/model/profile-role.interface';
import { profilePermissions } from '~shared/mocks/permissions.stub';

export const profileRoles: ProfileRole[] = [
  {
    id: 'tecan:om:role:admin',
    name: 'Administrator',
    permissions: profilePermissions
  }
];
