import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DropdownItem, ExternalLink } from '@tecan/ui';
import { Subject, takeUntil } from 'rxjs';

import { Theme } from '~core/models/theme.enum';
import { UserSettingsService } from '~core/services/user-settings.service';
import * as CoreActions from '~core/store/core.actions';
import { UserProfileService } from '~shared/auth/user-profile.service';
import { AppConfigService } from '~shared/configuration/app-config.service';
import { MENU_ITEMS } from '~shared/constants/menu-items';
import { MenuItem } from '~shared/models/menu-item.interface';

@Component({
  selector: 'capp-core-container',
  templateUrl: './core-container.component.html',
  styleUrls: ['./core-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreContainerComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];

  private destroyed$ = new Subject<void>();

  get roles(): string[] {
    return this.userProfileService.profile?.roles.map(({ name }) => name) ?? [];
  }

  get links(): ExternalLink[] {
    return Object.entries(this.appConfigService.links ?? {}).map(([key, value]) => ({
      label: this.translateService.instant(`profile.${key}`),
      url: value
    }));
  }

  get themeOptions(): DropdownItem[] {
    return this.userSettingsService.themeOptions.map(option => ({
      label: this.translateService.instant(option.label),
      value: option.value
    }));
  }

  constructor(
    private store: Store<any>,
    private translateService: TranslateService,
    public appConfigService: AppConfigService,
    public userProfileService: UserProfileService,
    public userSettingsService: UserSettingsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuItems = this.getPermittedMenuItems();
    this.authService.error$.pipe(takeUntil(this.destroyed$)).subscribe(error => this.onAuthError(error));
    this.userSettingsService.init();
  }

  onChangeLanguage(language: string) {
    this.userSettingsService.changeLanguage(language);
  }

  onChangeTheme(theme: string) {
    this.userSettingsService.changeTheme(theme as Theme);
  }

  onLogout() {
    this.store.dispatch(CoreActions.logout());
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  private onAuthError(error: Error) {
    console.error(error);
    this.authService.loginWithRedirect({
      appState: { target: this.router.url }
    });
  }

  private getPermittedMenuItems() {
    return MENU_ITEMS.filter(({ permission }) => this.userProfileService.hasPermission(permission));
  }
}
