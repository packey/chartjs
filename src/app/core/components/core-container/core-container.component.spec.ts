import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Spectator, SpyObject, createComponentFactory } from '@ngneat/spectator';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ExternalLink, TecHeaderComponent, TecProfileComponent } from '@tecan/ui';
import { MockComponents, MockPipe, MockProvider } from 'ng-mocks';
import { Subject } from 'rxjs';

import { CoreContainerComponent } from '~core/components/core-container/core-container.component';
import { MainMenuComponent } from '~core/components/main-menu/main-menu.component';
import { Theme } from '~core/models/theme.enum';
import { UserSettingsService } from '~core/services/user-settings.service';
import * as CoreActions from '~core/store/core.actions';
import { UserProfileService } from '~shared/auth/user-profile.service';
import { AppConfigService } from '~shared/configuration/app-config.service';
import { externalLinks } from '~shared/mocks/external-links.stub';
import { userProfileStub } from '~shared/mocks/user-profile.stub';

describe('CoreContainerComponent', () => {
  let spectator: Spectator<CoreContainerComponent>;
  let store: MockStore;
  let authService: SpyObject<AuthService>;
  let userSettingsService: SpyObject<UserSettingsService>;

  const authError$ = new Subject<Error>();

  const createComponent = createComponentFactory({
    component: CoreContainerComponent,
    imports: [RouterTestingModule],
    declarations: [
      MockPipe(TranslatePipe),
      MockComponents(
        MainMenuComponent,
        TecProfileComponent,
        TecHeaderComponent,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent
      )
    ],
    providers: [
      provideMockStore(),
      MockProvider(AppConfigService, { links: externalLinks }),
      MockProvider(TranslateService, {
        instant: () => 'translated'
      }),
      MockProvider(UserProfileService, { profile: userProfileStub }),
      MockProvider(UserSettingsService, {
        themeOptions: [{ label: 'light', value: Theme.Light }]
      }),
      MockProvider(Router, { url: '/app-url' }),
      MockProvider(AuthService, { error$: authError$.asObservable() })
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
    store = spectator.inject<any>(Store);
    authService = spectator.inject(AuthService);
    userSettingsService = spectator.inject(UserSettingsService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should change language', () => {
    spectator.component.onChangeLanguage('en');

    expect(userSettingsService.changeLanguage).toHaveBeenCalledWith('en');
  });

  it('should change theme', () => {
    spectator.component.onChangeTheme(Theme.Dark);

    expect(userSettingsService.changeTheme).toHaveBeenCalledWith(Theme.Dark);
  });

  it('should logout', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    spectator.component.onLogout();

    expect(dispatchSpy).toHaveBeenCalledWith(CoreActions.logout());
  });

  it('should generate external links', () => {
    const externalLink: ExternalLink[] = spectator.component.links;
    expect(externalLink).toEqual([
      { label: 'translated', url: 'https://www.tecan.com/terms-of-use-privacy-and-cookies-policy?p=tab--1' },
      { label: 'translated', url: 'https://www.tecan.com/terms-of-use-privacy-and-cookies-policy?p=tab--2' },
      { label: 'translated', url: 'https://www.tecan.com/terms-of-use-privacy-and-cookies-policy?p=tab--3' }
    ]);
  });

  it('should generate theme options', () => {
    const { themeOptions } = spectator.component;

    expect(themeOptions).toEqual([{ label: 'translated', value: Theme.Light }]);
  });

  it('should returns correct roles', () => {
    const roles: string[] = spectator.component.roles;
    expect(roles).toEqual(['Administrator']);
  });

  it('should redirect to login page when an authentication error is detected', () => {
    spyOn(console, 'error');
    const error = new Error();

    authError$.next(error);

    expect(authService.loginWithRedirect).toHaveBeenCalledOnceWith({
      appState: { target: '/app-url' }
    });
    expect(console.error).toHaveBeenCalledOnceWith(error);
  });
});
