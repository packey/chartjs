import { ProfileRole } from '~shared/auth/model/profile-role.interface';

export interface UserProfile {
  userId: string;
  organizationId: string;
  organizationName: string;
  name?: string;
  roles: ProfileRole[];
}
