import { TecSidebarItem } from '@tecan/ui';

import { AppPermission } from '~shared/auth/model/app-permission.enum';

export interface MenuItem extends TecSidebarItem {
  id: string;
  permission: AppPermission | null;
}
