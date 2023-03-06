import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { UserSettingsService } from '~core/services/user-settings.service';

@Component({
  selector: 'capp-error-layout',
  templateUrl: './error-layout.component.html',
  styleUrls: ['./error-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorLayoutComponent implements OnInit {
  constructor(private userSettings: UserSettingsService) {}

  ngOnInit() {
    this.userSettings.init();
  }
}
