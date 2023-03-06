import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DropdownItem, Language } from '@tecan/ui';

import { Theme } from '~core/models/theme.enum';
import { UserSettings } from '~core/models/user-settings.model';
import { SettingsStorageService } from '~core/services/settings-storage.service';
import { AppConfigService } from '~shared/configuration/app-config.service';
import { DEFAULT_LANGUAGE_CODE } from '~shared/i18n/constants';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  get theme(): Theme {
    return this.settings.theme;
  }

  themeOptions: DropdownItem[] = [
    { label: 'profile.themeOptions.dark', value: Theme.Dark },
    { label: 'profile.themeOptions.light', value: Theme.Light },
    { label: 'profile.themeOptions.device', value: Theme.Device }
  ];

  get language(): string {
    return this.settings.language;
  }

  languageOptions: Language[] = [];

  get settings(): UserSettings {
    const storedSettings = this.storage.get();
    const isValid = storedSettings != null && storedSettings.version === this.defaultSettings.version;

    return isValid ? storedSettings : this.defaultSettings;
  }

  readonly defaultSettings: UserSettings = Object.freeze({
    version: 1,
    language: DEFAULT_LANGUAGE_CODE,
    theme: Theme.Device
  });
  private themeClasses = {
    [Theme.Dark]: 'tec-dark-theme',
    [Theme.Light]: 'tec-light-theme',
    [Theme.Device]: 'tec-device-theme'
  };

  constructor(
    private storage: SettingsStorageService,
    private appConfiguration: AppConfigService,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  init() {
    this.initLanguages();

    this.changeTheme(this.theme);
    this.changeLanguage(this.language);
  }

  changeTheme(theme: Theme) {
    const isKnownTheme = this.themeClasses[theme] != null;
    theme = isKnownTheme ? theme : Theme.Dark;
    this.storage.set({ ...this.settings, theme });

    const documentClasses = this.document.documentElement.classList;
    // disable all transitions to make the theme switch instantly
    documentClasses.add('tec-no-transitions');

    // clear theme classes
    documentClasses.remove(...Object.values(this.themeClasses));
    documentClasses.add(this.themeClasses[theme]);
    this.forceRedraw();

    // enable transitions again
    documentClasses.remove('tec-no-transitions');
  }

  changeLanguage(language: string) {
    this.storage.set({ ...this.settings, language });

    this.translateService.use(language);
    this.document.documentElement.lang = language;
  }

  private initLanguages() {
    this.languageOptions = this.appConfiguration.i18n.supportedLanguages;
    const codes = this.languageOptions.map(lang => lang.code);
    this.translateService.addLangs(codes);
  }

  /**
   * Force the browser to redraw
   */
  private forceRedraw() {
    // Accessing offsetHeight forces the browser to redraw the element
    return this.document.documentElement.offsetHeight;
  }
}
