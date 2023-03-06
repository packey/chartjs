import { AuthService } from '@auth0/auth0-angular';
import { SpectatorService, SpyObject, createServiceFactory } from '@ngneat/spectator';
import { TranslateService } from '@ngx-translate/core';
import { MockProvider } from 'ng-mocks';

import { Theme } from '~core/models/theme.enum';
import { UserSettings } from '~core/models/user-settings.model';
import { SettingsStorageService } from '~core/services/settings-storage.service';
import { UserSettingsService } from '~core/services/user-settings.service';
import { AppConfigService } from '~shared/configuration/app-config.service';

describe('UserSettingsService', () => {
  const createService = createServiceFactory({
    service: UserSettingsService,
    providers: [
      MockProvider(SettingsStorageService),
      MockProvider(AuthService),
      MockProvider(TranslateService),
      MockProvider(AppConfigService, {
        i18n: {
          supportedLanguages: [{ code: 'en', name: 'English' }]
        }
      })
    ]
  });
  let spectator: SpectatorService<UserSettingsService>;
  let settingsStorage: SpyObject<SettingsStorageService>;
  let translateService: SpyObject<TranslateService>;

  beforeEach(() => {
    spectator = createService();
    settingsStorage = spectator.inject(SettingsStorageService);
    translateService = spectator.inject(TranslateService);
  });

  afterEach(() => {
    // cleanup leftover classes.
    document.documentElement.classList.remove('tec-no-transition', 'tec-dark-theme', 'tec-light-theme');
    document.documentElement.lang = 'en';
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  describe('init', () => {
    it('should init theme and language', () => {
      spectator.service.init();

      expect(document.documentElement.classList).toContain('tec-device-theme');
      expect(document.documentElement.lang).toContain('en');
      expect(translateService.addLangs).toHaveBeenCalledWith(['en']);
      expect(translateService.use).toHaveBeenCalledWith('en');
    });
  });

  describe('changeTheme', () => {
    it('should persist selection to storage', () => {
      spectator.service.changeTheme(Theme.Light);

      expect(settingsStorage.set).toHaveBeenCalledWith({
        ...spectator.service.defaultSettings,
        theme: Theme.Light
      });
    });

    it('should set tec-light-theme class on the document element when changing to Light theme', () => {
      spectator.service.changeTheme(Theme.Light);

      expect(document.documentElement.classList).toContain('tec-light-theme');
      expect(document.documentElement.classList).not.toContain('tec-no-transition');
    });

    it('should set tec-dark-theme class on the document element when changing to Dark theme', () => {
      spectator.service.changeTheme(Theme.Dark);

      expect(document.documentElement.classList).toContain('tec-dark-theme');
      expect(document.documentElement.classList).not.toContain('tec-no-transition');
    });

    it('should set tec-dark-theme class on the document element when changing to an unknown theme', () => {
      spectator.service.changeTheme('unknown' as Theme);

      expect(document.documentElement.classList).toContain('tec-dark-theme');
      expect(document.documentElement.classList).not.toContain('tec-no-transition');
    });

    it('should remove existing theme class on the document element and add a new one', () => {
      spectator.service.changeTheme(Theme.Light);
      spectator.service.changeTheme(Theme.Dark);

      expect(document.documentElement.classList).toContain('tec-dark-theme');
      expect(document.documentElement.classList).not.toContain('tec-light-theme');
      expect(document.documentElement.classList).not.toContain('tec-no-transition');
    });
  });

  describe('changeLanguage', () => {
    it('should store language selection', () => {
      spectator.service.changeLanguage('de');

      expect(settingsStorage.set).toHaveBeenCalledWith({ ...spectator.service.defaultSettings, language: 'de' });
    });

    it('should change used language', () => {
      spectator.service.changeLanguage('de');

      expect(translateService.use).toHaveBeenCalledWith('de');
      expect(document.documentElement.lang).toBe('de');
    });
  });

  describe('settings', () => {
    it('should return default settings when storage contains none', () => {
      expect(spectator.service.settings).toEqual(spectator.service.defaultSettings);
    });

    it('should return default settings when version mismatch is detected', () => {
      const stored: UserSettings = { ...spectator.service.defaultSettings, language: 'de', version: 0 };

      settingsStorage.get.and.returnValue(stored);

      expect(spectator.service.settings).toEqual(spectator.service.defaultSettings);
    });

    it('should return stored settings', () => {
      const stored: UserSettings = { ...spectator.service.defaultSettings, language: 'de' };

      settingsStorage.get.and.returnValue(stored);

      expect(spectator.service.settings).toEqual(stored);
    });
  });
});
