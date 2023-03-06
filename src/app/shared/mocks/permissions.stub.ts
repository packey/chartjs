import { ProfilePermission } from '~shared/auth/model/profile-permission.interface';

export const profilePermissions: ProfilePermission[] = [
  {
    id: 'tecan:om:permission:users:create',
    name: 'Create Users'
  },
  {
    id: 'tecan:om:permission:users:read',
    name: 'Read Users'
  },
  {
    id: 'tecan:om:permission:users:update',
    name: 'Update Users'
  },
  {
    id: 'tecan:om:permission:users:delete',

    name: 'Delete Users'
  }
];
