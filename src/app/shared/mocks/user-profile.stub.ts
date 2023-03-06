import { UserProfile } from '~shared/auth/model/user-profile.interface';
import { profileRoles } from '~shared/mocks/roles.stub';

// Actual details of Tecan Admin user in DEV env.
export const userProfileStub: UserProfile = {
  userId: 'af47c9b1-8b60-443d-865d-08eab0dcac77',
  organizationId: 'a4f66f77-ea86-4729-89f3-526daf7d99f1',
  roles: profileRoles,
  organizationName: 'Tecan'
};
