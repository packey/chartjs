import { AppPermission } from '~shared/auth/model/app-permission.enum';

export const ROUTES = {
  INSTRUMENTS: {
    url: '/instruments',
    path: 'instruments',
    permission: AppPermission.ReadUsers
  },
  CHART: {
    url: '/chart',
    path: 'chart',
    permission: AppPermission.ReadUsers
  },
  FATAL_ERROR: {
    url: '/error/fatal',
    path: 'fatal'
  },
  NOT_FOUND_NO_PROFILE: {
    url: '/error/not-found',
    path: 'not-found'
  },
  NOT_FOUND: {
    url: '/not-found',
    path: 'not-found'
  }
};
