import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';

import { trackById } from '~shared/helpers/track-by.helper';
import { MenuItem } from '~shared/models/menu-item.interface';

@Component({
  selector: 'capp-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent {
  @Input() menuItems: MenuItem[] = [];

  trackBy: TrackByFunction<MenuItem> = trackById;
}
