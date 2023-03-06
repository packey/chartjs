import { ROUTES } from '~shared/constants/routes';
import { MenuItem } from '~shared/models/menu-item.interface';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'instruments',
    label: 'instruments.title',
    iconName: 'Instrument',
    routerLink: ROUTES.INSTRUMENTS.url,
    permission: ROUTES.INSTRUMENTS.permission
  },
  {
    id: '2',
    name: 'chart',
    label: 'chart.title',
    iconName: 'Edit',
    routerLink: ROUTES.CHART.url,
    permission: ROUTES.CHART.permission
  },
  {
    id: '3',
    name: 'link',
    label: 'link.title',
    iconName: 'Bin',
    routerLink: '/some-link',
    permission: null
  }
];
